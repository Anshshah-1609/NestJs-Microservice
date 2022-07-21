import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './craete-user.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  handleUserCreate(data: CreateUserEvent) {
    console.log('handleUserCreated - COMMUNICATION');
    console.log(data);
  }
}
