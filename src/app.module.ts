import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'mega_bib',
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ruta de las entidades
    synchronize: true,
  }),AuthModule, UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
