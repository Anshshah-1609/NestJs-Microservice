/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CREATE_ITEM, DEMO_ENDPOINT, GET_ITEM_BY_ID } from './tcp.constant';

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
      return this.appService.createItem(payload.id, payload.createItemDto);
    }

    console.log('payloadbreb', id, payload);

    return this.appService.createItem(id, payload);
  }

  @MessagePattern(GET_ITEM_BY_ID)
  @Get('item/:id')
  getItemById(@Param('id') itemId: number, @Body() payload: any) {
    if (!itemId) {
      return this.appService.getItemById(payload.id);
    }

    return this.appService.getItemById(itemId);
  }

  @MessagePattern(DEMO_ENDPOINT)
  @Post('demo/:id')
  demo(@Param('id') id: number, @Body() payload: any) {
    if (!id) {
      return this.appService.demo(payload.isValid, payload.id);
    }
    return this.appService.demo(payload.isValid, id);
  }
}
