/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CREATE_ITEM, GET_ITEM_BY_ID } from './tcp.constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(':id/create')
  @MessagePattern(CREATE_ITEM)
  createItem(@Param('id') id: number, @Body() payload) {
    if (!id) {
      console.log('Id not found');
      return this.appService.createItem(payload.id, payload);
    }

    console.log('payloadbreb', id, payload);

    return this.appService.createItem(id, payload);
  }

  @MessagePattern(GET_ITEM_BY_ID)
  @Get('/item/:id')
  getItemById(@Param('id') id: number, @Body() payload) {
    if (!id) {
      return this.appService.getItemById(payload);
    }

    return this.appService.getItemById(id);
  }
}
