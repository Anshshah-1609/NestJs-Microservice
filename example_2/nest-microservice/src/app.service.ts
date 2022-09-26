import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createItem(itemDto) {
    // const item = new ItemEntity();
    console.log(itemDto.createItemDto);
    return itemDto;
    // return this.itemRepository.save(item);
  }

  getItemById(id) {
    return {
      message: `Item id: ${id}`,
    };
  }
}
