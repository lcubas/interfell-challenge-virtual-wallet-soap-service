import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getData(args: { id: string }): Promise<{ data: string }> {
    return new Promise((resolve) => {
      resolve({ data: `Retrieved data for ID: ${args.id}` });
    });
  }
}
