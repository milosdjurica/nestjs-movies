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
import { AtGuard, RtGuard } from "@Src/common/guards";
import { GetCurrentUser, GetCurrentUserId } from "@Src/common/decorators";

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

  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @Post("local/logout")
  logOutLocal(@GetCurrentUserId() userId: number) {
    return this.authService.logOutLocal(userId);
  }

  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
