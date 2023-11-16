import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LogInDto, RegisterDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("local/register")
  registerLocal(@Body() registerDto: RegisterDto) {
    return this.authService.registerLocal(registerDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post("local/login")
  logInLocal(@Body() logInDto: LogInDto) {
    return this.authService.logInLocal(logInDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  @Post("local/logout")
  logOutLocal() {
    return this.authService.logOutLocal(1);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  refreshTokens() {
    return this.authService.refreshTokens(1, "rt");
  }
}
