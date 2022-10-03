/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createItem(id, payload) {
    // const item = new ItemEntity();
    console.log(payload, '& Id: ', id);
    return {
      message: 'Item created!',
    };
    // return this.itemRepository.save(item);
  }

  getItemById(id) {
    console.log(`Item id: ${id}`);
    return {
      message: `Item id: ${id}`,
    };
  }

  demo(isValid, id) {
    console.log(isValid, ' ', id);

    return {
      isValid,
      id,
    };
  }
}
