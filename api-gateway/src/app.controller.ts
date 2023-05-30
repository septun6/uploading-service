import { Controller, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // while files are not passed to core-service,
  // they are stored in the dynamic dictionary
  files= new Map<string, Express.Multer.File>;

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5000000})
      ]
    })
  ) file: Express.Multer.File) {
    this.files[file.originalname] = file;
    console.log(file);
  }

  @Get()
  getHello(): Map<string, Express.Multer.File>{
    return this.files;
  }
}
