/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
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

  @Post('demo/:id')
  demo(@Body('isValid') isValid: string, @Param('id') id: number) {
    return this.appService.demo(isValid, id);
  }

  @Post('test')
  test(@Body() dto: { name: string; age: number }) {
    return this.appService.test(dto);
  }

  @Get('get-file')
  async getFile(@Res() res) {
    const path = await this.appService.getFile();
    res.sendFile(path, { root: 'storage' });
    // console.log(res);
  }
}
