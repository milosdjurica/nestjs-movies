import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from "@nestjs/common";
import { Role } from "@prisma/client";

import { Roles } from "@Src/common/decorators";
import { RolesGuard, UserCanChange } from "@Src/common/guards";
import { ParseOptionalBooleanPipe } from "@Src/common/pipes";

import { UsersService } from "./users.service";
import { ChangeRoleDto, CreateUserDto, UpdateUserDto } from "./dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll(
    @Query("movies", ParseOptionalBooleanPipe) movies: boolean,
    @Query("series", ParseOptionalBooleanPipe) series: boolean,
  ) {
    return this.usersService.findAll(movies, series);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query("movies", ParseOptionalBooleanPipe) movies: boolean,
    @Query("series", ParseOptionalBooleanPipe) series: boolean,
  ) {
    return this.usersService.findOne(id, movies, series);
  }

  @UseGuards(UserCanChange)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // ! change role (only admin can change it for user)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch("admin/:id")
  changeRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() changeRoleDto: ChangeRoleDto,
  ) {
    return this.usersService.changeRole(id, changeRoleDto);
  }

  @UseGuards(UserCanChange)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
