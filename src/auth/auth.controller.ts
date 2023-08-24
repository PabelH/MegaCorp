
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 201, description: 'Email y Contraseña correctos Token de acceso creado.'}) 
  async login(@Body() loginDto: LoginAuthDto) {
    const token = await this.authService.login(loginDto);
    return { access_token: token }; 
  }
}

