import { DatabaseService } from "@Src/database/database.service";
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { ChangeRoleDto, CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAll(includeMovies?: boolean, includeSeries?: boolean) {
    const users = await this.databaseService.user.findMany({
      include: {
        movies: includeMovies,
        series: includeSeries,
      },
    });

    // ! Excluding password and hashedRt
    return users.map((user) => this.exclude(user, ["password", "hashedRt"]));
  }

  async findOne(id: number, movies?: boolean, series?: boolean) {
    const userExist = await this.databaseService.user.findUnique({
      where: { id },
      include: { movies, series },
    });
    if (!userExist)
      throw new NotFoundException(`User with ID ${id} does not exist!`);

    // ! Excluding password and hashedRt
    return this.exclude(userExist, ["password", "hashedRt"]);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    // ! check if new username is already taken,
    if (updateUserDto.username)
      await this.usernameExist(updateUserDto.username);

    // ! hash password and apply other changes from updateUserDto
    if (updateUserDto.password) {
      const hashPass = await this.hashData(updateUserDto.password);
      // ! deleting so i can spread updateUserDto
      delete updateUserDto.password;
      const updatedUser = await this.databaseService.user.update({
        where: { id },
        data: {
          password: hashPass,
          ...updateUserDto,
        },
      });
      return this.exclude(updatedUser, ["password", "hashedRt"]);
    }

    // ! this code executes if there is no password field provided, then we just update everything
    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.exclude(updatedUser, ["password", "hashedRt"]);
  }

  // ! change role (only admin can change it for user)
  async changeRole(id: number, changeRoleDto: ChangeRoleDto) {
    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: changeRoleDto,
    });
    return this.exclude(updatedUser, ["password", "hashedRt"]);
  }

  async remove(id: number) {
    const deletedUser = await this.databaseService.user.delete({
      where: {
        id,
      },
    });
    return this.exclude(deletedUser, ["password", "hashedRt"]);
  }

  // !!!!!!!!!!!!!! HELPER FUNCTIONS
  async usernameExist(username: string) {
    const foundUser = await this.databaseService.user.findUnique({
      where: { username },
    });
    if (foundUser)
      throw new ConflictException(
        `User with username ${username} already exist! Please provide another username.`,
      );
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  // ! Helper function to exclude fields like password and hashedRt from user
  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }
}
