import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { LogInDto, RegisterDto } from "./dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types";
import { UsersService } from "@Src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // ! This will only be used by normal users
  // TODO In user service i will create a method for admin to add other users or other admins
  async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
    // TODO if user with that username exist, throw error to pick another username
    // const userExist = await this.userService.findOne(registerDto.username);

    const hash = await this.hashData(registerDto.password);
    const newUser = await this.databaseService.user.create({
      data: {
        username: registerDto.username,
        password: hash,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.username,
      newUser.role,
    );
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async logInLocal(logInDto: LogInDto) {
    return logInDto;
  }

  async logOutLocal() {}

  async refreshTokens() {}

  async updateRtHash(id: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(
    userId: number,
    username: string,
    // TODO fix type
    role: "USER" | "ADMIN",
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: process.env.AT_SECRET,
          // 3h
          expiresIn: 60 * 60 * 3,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: process.env.RT_SECRET,
          // 7days
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
