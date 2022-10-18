import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser: UserDto = {
      ...createUserDto,
      Id: randomUUID(),
      IsPremium: false,
      Active: true,
      CreatedAt: new Date(),
      CreatedBy: 'experimental_api',
      UpdatedAt: new Date(),
      UpdatedBy: 'experimental_api',
    };
    const saved = await this.userRepository.save(newUser);
    return saved;
  }

  async findAll(paginationDto: PaginationDto) {
    const { take = 10, skip = 0 } = paginationDto;
    const users = await this.userRepository.find({
      order: { CreatedAt: "DESC" },
      take,
      skip,
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { Id: id },
    });
    if (!user) throw new NotFoundException("the user doesn't exists");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userdb = await this.findOne(id);
    const updatedUser: UserDto = {
      ...userdb,
      ...updateUserDto,
      UpdatedAt: new Date(),
      UpdatedBy: 'experimental_api',
    };
    await this.userRepository.update(id, updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const userdb = await this.findOne(id);
    await this.userRepository.delete(id);
    return { message: `user with id ${id} was deleted`, userdb };
  }
}
