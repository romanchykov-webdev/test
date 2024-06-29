import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "./models/user.model";
import { UserSchema } from "./schemas/user.schema";
import { Watchlist } from "../watchlist/models/watchlist.model";
import { WatchlistSchema } from "../watchlist/schemas/watchlist.schema";
import { TokenModule } from "../token/token.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Watchlist.name, schema: WatchlistSchema },
    ]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
