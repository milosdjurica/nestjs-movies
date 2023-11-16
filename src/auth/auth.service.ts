import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { LogInDto, RegisterDto } from "./dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  // TODO add return types Promise<Token>
  async registerLocal(registerDto: RegisterDto) {
    const hash = await this.hashData(registerDto.password);
    const newUser = this.databaseService.user.create({
      data: {
        username: registerDto.username,
        password: hash,
      },
    });
    return newUser;
  }

  async logInLocal(logInDto: LogInDto) {
    return logInDto;
  }

  async logOutLocal() {}

  async refreshTokens() {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
