import { DatabaseService } from "@Src/database/database.service";
import { Injectable, ConflictException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";

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

  async findAll({ movies, series }: { movies: boolean; series: boolean }) {
    return this.databaseService.user.findMany({
      include: {
        movies,
        series,
      },
    });
  }

  async findOne(id: number) {
    // TODO also pass include: {movies, series}
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
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
}
