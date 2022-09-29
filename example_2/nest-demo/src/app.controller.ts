/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(':id/create')
  create(@Param('id') id: number, @Body() createItemDto) {
    return this.appService.createItem(id, createItemDto);
  }

  @Get('/item/:id')
  getById(@Param('id') id: number) {
    return this.appService.getItemById(id);
  }
}
