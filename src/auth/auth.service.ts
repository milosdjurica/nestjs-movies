import { DatabaseService } from "@Src/database/database.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
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

  // ! This will only be used by normal users, role will always be USER
  async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
    await this.userService.usernameExist(registerDto.username);

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

  async logInLocal(logInDto: LogInDto): Promise<Tokens> {
    const user = await this.databaseService.user.findUnique({
      where: {
        username: logInDto.username,
      },
    });

    if (!user)
      throw new ForbiddenException(
        `Username ${logInDto.username} does not exist!`,
      );

    const passwordMatches = await bcrypt.compare(
      logInDto.password,
      user.password,
    );

    // ! In reality it is always wrong password,
    // ! but it could be that user inserted good password but for wrong username
    if (!passwordMatches)
      throw new ForbiddenException("Wrong username or password!");

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logOutLocal(id: number) {
    // ! updateMany so i can pass in hashedRt not null and prevent logout spam
    await this.databaseService.user.updateMany({
      where: {
        id,
        hashedRt: { not: null },
      },
      data: { hashedRt: null },
    });
  }

  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.databaseService.user.findUnique({ where: { id } });

    if (!user) throw new ForbiddenException(`No user with ID ${id} !`);
    if (!user.hashedRt)
      throw new ForbiddenException(`User is compromised! No tokens!`);

    const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!rtMatches)
      throw new ForbiddenException("You do not have valid credentials!");

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

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
    // TODO check type
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
