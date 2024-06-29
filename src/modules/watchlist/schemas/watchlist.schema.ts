import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/schemas/user.schema"; // Убедитесь, что путь к файлу схемы пользователя верен

export type WatchlistDocument = Watchlist & Document;

@Schema()
export class Watchlist {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  assetId: string;
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
