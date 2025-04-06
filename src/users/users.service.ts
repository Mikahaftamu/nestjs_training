import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  findAll(role?: "ADMIN" | "USER") {
    if (role) return this.databaseService.user.findMany({
      where: {
        role: role,
      },
    })
    else return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

    update(id: number, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
