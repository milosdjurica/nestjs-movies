import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { LogInDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  registerLocal(registerDto: RegisterDto) {
    return registerDto;
  }

  logInLocal(logInDto: LogInDto) {
    return logInDto;
  }

  logOutLocal() {}

  refreshTokens() {}
}
