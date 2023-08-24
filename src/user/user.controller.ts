import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear Usuario' })
  @ApiResponse({ status: 201, description: 'Usuario agregado correctamente.'}) 
  async registerUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.registerUser(registerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todos los Usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios listados correctamente.'}) 
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener Usuario Por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.'}) 
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('search/:email')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener Usuario Por email' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.'}) 
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar Usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.'}) 
  async updateUser(@Param('id') id: number, @Body() updateUserDto: RegisterDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar Usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.'}) 
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  }
