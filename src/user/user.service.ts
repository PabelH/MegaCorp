import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<User> {
    const { email, username } = registerDto;

    const userWithEmail = await this.userRepository.findOne({ where: { email } });
    if (userWithEmail) {
      throw new ConflictException('Email already exists');
    }

    const userWithUsername = await this.userRepository.findOne({ where: { username } });
    if (userWithUsername) {
      throw new ConflictException('Username already exists');
    }

    const user = this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: RegisterDto): Promise<User> {
    const user = await this.getUserById(id);

    const { email, username } = updateUserDto;
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.isAdmin !== undefined) {
      user.isAdmin = updateUserDto.isAdmin;
    }

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<string> {
    const user = await this.getUserById(id);

    await this.userRepository.remove(user);

    return 'User deleted successfully';
  }
}
