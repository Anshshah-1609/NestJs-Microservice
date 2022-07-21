import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createItem(createItemDto) {
    const hello = 'hello';
    return this.client.send(
      { role: 'item', cmd: 'create' },
      { createItemDto, hello },
    );
  }
  getItemById(id: number) {
    return this.client.send({ role: 'item', cmd: 'get-by-id' }, id);
  }
}
