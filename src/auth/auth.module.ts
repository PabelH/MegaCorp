import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '1h' }, // Opciones de JWT
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}