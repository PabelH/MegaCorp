import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.registerUser(registerDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('search/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: RegisterDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  }
