import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "../user/dto";
import { UserLoginDTO } from "./dto";
import { AuthUserResponse } from "./response";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from "../../guards/jwt-guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  //registration user
  //to describer the documentation
  @ApiTags("API")
  @ApiResponse({ status: 201, type: CreateUserDTO })
  //to describer the documentation end--
  @Post("register")
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUsers(dto);
  }

  //registration user end-------------

  //login user
  //to describer the documentation
  @ApiTags("API")
  @ApiResponse({ status: 200, type: AuthUserResponse })
  //to describer the documentation end--
  @Post("login")
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  //login user end------------------

  // get public user info
  @UseGuards(JwtAuthGuard)
  @Get("get-public-user-info")
  getPublicUserInfo(@Req() request) {
    const user = request.user;
    return this.userService.publicUser(user.email);
  }

  // get public user info end
}
