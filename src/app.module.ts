import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import configurations from './configurations';

import { User } from './modules/user/models/user.model';
import { UserSchema } from './modules/user/schemas/user.schema';
import { TokenModule } from './modules/token/token.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { WatchlistSchema } from './modules/watchlist/schemas/watchlist.schema';
import { Watchlist } from './modules/watchlist/models/watchlist.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Watchlist.name, schema: WatchlistSchema },
    ]),
    UserModule,
    AuthModule,
    TokenModule,
    WatchlistModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
