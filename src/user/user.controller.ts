import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  authService: any;
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);

    if (user && user.password === loginDto.password) {
      const token = await this.authService.generateToken(user.id);
      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
