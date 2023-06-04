import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus(): string {
    return 'Core service is up and running!';
  }
}
  