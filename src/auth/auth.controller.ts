
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    const token = await this.authService.login(loginDto);
    return { access_token: token }; // Asegúrate de devolver el token aquí
  }
}

