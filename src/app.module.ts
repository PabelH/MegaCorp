import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: '',
    // database: 'mega_bib',
    // host: databaseConfig.host,
    // port: databaseConfig.port,
    // username: databaseConfig.username,
    // password: databaseConfig.password,
    // database: databaseConfig.database,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT, // Sin necesidad de conversión
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ruta de las entidades
    synchronize: true,
  }), UserModule, BookModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
