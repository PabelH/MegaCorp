import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
  
    if (!user) {
      console.log('Invalid credentials');
      return null;
    }
  
    const payload = { email: user.email, sub: user.id }; 
    const token = this.jwtService.sign(payload);
    console.log('Generated token:', token);
    return { access_token: token };
  }
  
}
