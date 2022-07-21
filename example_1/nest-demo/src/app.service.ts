import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  ) {}
  private readonly users: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }
  createUser(createUserdto: CreateUserDto) {
    this.users.push(createUserdto);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserdto),
    );
    console.log('Sent to service');
  }
}
