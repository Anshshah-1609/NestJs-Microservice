/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CREATE_ITEM,
  DEMO_ENDPOINT,
  GET_FILE,
  GET_ITEM_BY_ID,
  TEST_ENDPOINT,
} from './tcp.constant';

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
      console.log('Item id from MessagePattern : ', payload.id);
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

  @MessagePattern(TEST_ENDPOINT)
  @Post('test')
  test(@Body() dto) {
    return this.appService.test(dto);
  }

  @MessagePattern(GET_FILE)
  getFile() {
    return '111/logo.png';
  }
}
