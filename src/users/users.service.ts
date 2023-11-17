import { DatabaseService } from "@Src/database/database.service";
import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { ChangeRoleDto, CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  // TODO create auth module, where users can auth and all that,
  // TODO this create will be reserved only for admin to add another admin

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
    });
    return user;
  }

  // TODO exclude password and hasahedRt
  async findAll({ movies, series }: { movies: boolean; series: boolean }) {
    return await this.databaseService.user.findMany({
      include: {
        movies,
        series,
      },
    });
  }

  async findOne(id: number) {
    try {
      // TODO also pass include: {movies, series}
      const userExist = await this.databaseService.genre.findUnique({
        where: { id },
      });
      if (!userExist)
        throw new NotFoundException(`User with ID ${id} does not exist!`);
      return userExist;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `An error occurred while trying to find the user with ID ${id}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO maybe split into 3 parts,
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
      return await this.databaseService.user.update({
        where: { id },
        data: {
          password: hashPass,
          ...updateUserDto,
        },
      });
    }

    // ! this code executes if there is no password field provided, then we just update everything
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // ! change role (only admin can change it for user)
  async changeRole(id: number, changeRoleDto: ChangeRoleDto) {
    return await this.databaseService.user.update({
      where: { id },
      data: changeRoleDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }

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
}
