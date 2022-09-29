/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CREATE_ITEM, GET_ITEM_BY_ID } from './tcp.constant';

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createItem(id: number, createItemDto) {
    const response = this.client
      .send(CREATE_ITEM, { createItemDto, id })
      .pipe();
    const createItem = await lastValueFrom(response);
    console.log('createItem', createItem);

    return createItem;
  }

  async getItemById(id: number) {
    const response = this.client.send(GET_ITEM_BY_ID, id).pipe();
    const getItem = await lastValueFrom(response);
    console.log('getItem', getItem);

    return getItem;
  }
}
