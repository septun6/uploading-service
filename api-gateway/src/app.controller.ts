import { Controller, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Transport, Client, ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Client({
    transport: Transport.NATS,
    options: {
      url: ['nats://localhost:4222'],
    },
  })
  client: ClientProxy;

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5000000})
      ]
    })
  ) file: Express.Multer.File): Promise<any> {
    return firstValueFrom(this.client.send('upload', file));
  }

  @Get()
  async getFiles(): Promise<Observable<any>>{
    return await this.client.send('list', '');
  }
}
