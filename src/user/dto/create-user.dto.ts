import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsBoolean, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({description: 'Email del usuario',})
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({description: 'Nombre de usuario',})
  username: string;

  @IsNotEmpty()
  @ApiProperty({description: 'Contraseña del usuario',})
  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @ApiProperty({description: 'Lector y/o Administrador',})
  isAdmin: boolean;
}
