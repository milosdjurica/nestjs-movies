import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LogInDto, RegisterDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("local/register")
  registerLocal(@Body() registerDto: RegisterDto) {
    this.authService.registerLocal(registerDto);
  }

  @Post("local/login")
  logInLocal(@Body() logInDto: LogInDto) {
    this.authService.logInLocal(logInDto);
  }

  @Post("local/logout")
  logOutLocal() {
    this.authService.logOutLocal();
  }

  @Post("refresh")
  refreshTokens() {
    this.authService.refreshTokens();
  }
}
