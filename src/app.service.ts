import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NAOWorld! This is a RESTful API with NestJS';
  }
}
