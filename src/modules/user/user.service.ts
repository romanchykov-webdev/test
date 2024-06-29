import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDTO, UpdateUserDTO, UpdatePasswordDTO } from "./dto";
import { AuthUserResponse } from "../auth/response";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly tokenService: TokenService
  ) {
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async createUser(dto: CreateUserDTO): Promise<UserDocument> {
    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword
    });
    return newUser.save();
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    const user = await this.userModel.findOne({ email }).select("-password").exec();
    const token = await this.tokenService.generationJwtToken({ id: user._id, email: user.email });
    return { user, token };
  }

  async updateUser(userId: string, dto: UpdateUserDTO): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  async updatePassword(userId: string, dto: UpdatePasswordDTO): Promise<UserDocument> {
    const user = await this.findUserById(userId);
    const validatePassword = await bcrypt.compare(dto.oldPassword, user.password);
    if (!validatePassword) {
      throw new BadRequestException("Old password does not match.");
    }
    const hashedPassword = await this.hashPassword(dto.newPassword);
    return this.userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.userModel.findByIdAndDelete(id).exec();
    return true;
  }
}
