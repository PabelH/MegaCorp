import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: 'Email del usuario',})
  email: string;

  @IsNotEmpty()
  @ApiProperty({description: 'Contraseña del usuario',})
  password: string;
}

