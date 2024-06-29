import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Watchlist } from "./models/watchlist.model";
import { WatchlistDocument } from "./schemas/watchlist.schema";
import { CreateAssetsResponse } from "./response";

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name)
    private watchlistModel: Model<WatchlistDocument>,
  ) {}

  async createAsset(user, dto): Promise<CreateAssetsResponse> {
    try {
      const newAsset = new this.watchlistModel({
        userId: user.id,
        name: dto.name,
        assetId: dto.assetId,
      });
      await newAsset.save();
      // @ts-ignore
      return newAsset;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserAssets(userId: string): Promise<Watchlist[]> {
    try {
      // @ts-ignore
      return await this.watchlistModel.find({ userId: userId }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAsset(userId: string, assetId: string): Promise<boolean> {
    try {
      const result = await this.watchlistModel
        .deleteOne({ _id: assetId, userId: userId })
        .exec();
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
