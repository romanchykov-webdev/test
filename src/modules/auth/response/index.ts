import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UserResponse {
  @ApiProperty() //это декоратор из модуля @nestjs/swagger, который используется для добавления метаданных к свойствам класса. Эти метаданные затем используются для автоматической генерации OpenAPI (Swagger) документации вашего API.
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty() //это декоратор из модуля @nestjs/swagger, который используется для добавления метаданных к свойствам класса. Эти метаданные затем используются для автоматической генерации OpenAPI (Swagger) документации вашего API.
  @IsString()
  token: string;
}
