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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ChangeRoleDto, CreateUserDto, UpdateUserDto } from "./dto";
import { Roles } from "@Src/common/decorators";
import { Role } from "@prisma/client";
import { RolesGuard, UserCanChange } from "@Src/common/guards";

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
  // TODO pass movies and series as query params or something, (default should be false?)
  findAll() {
    return this.usersService.findAll({ movies: true, series: true });
  }

  // TODO Should check from JWT if ID === /:id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
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

  // TODO Should check from JWT if ID === /:id
  @UseGuards(UserCanChange)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
