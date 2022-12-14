/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import {
  CREATE_ITEM,
  DEMO_ENDPOINT,
  GET_FILE,
  GET_ITEM_BY_ID,
  TEST_ENDPOINT,
} from './tcp.constant';

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
    console.log('createItem: ', createItem);

    return createItem;
  }

  async getItemById(id: number) {
    const response = this.client.send(GET_ITEM_BY_ID, { id }).pipe();
    const getItem = await lastValueFrom(response);
    console.log('getItem', getItem);

    return getItem;
  }

  async demo(isValid, id) {
    const response = this.client
      .send(DEMO_ENDPOINT, {
        isValid,
        id,
      })
      .pipe();
    return lastValueFrom(response);
  }

  async test(dto: { name: string; age: number }) {
    const response = this.client.send(TEST_ENDPOINT, dto).pipe();

    return lastValueFrom(response);
  }

  async getFile() {
    const response = this.client.send(GET_FILE, {}).pipe();
    const data = await lastValueFrom(response);
    console.log('DATA -----------', data);

    return `${data}`;
  }
}
