import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @MessagePattern('upload')
  uploadFile(fileBuffer: Express.Multer.File): any {
    return this.fileService.uploadFile(fileBuffer);
  }

  @MessagePattern('list')
  async getFiles() {
    return await this.fileService.getFiles();
  }
}
