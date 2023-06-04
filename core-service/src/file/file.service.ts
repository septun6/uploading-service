import { Injectable } from '@nestjs/common';
import { storage, bucketName } from '../google.storage';

@Injectable()
export class FileService {
    async uploadFile(file: Express.Multer.File) {
    const buffer = Buffer.from(file.buffer);
    const originalname = file.originalname;
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(originalname);
    const blobStream = await blob.createWriteStream({
      resumable: false,
    });
    await blobStream.on('error', (err) => {
      throw new Error(`Error uploading file: ${err}`);
    });
    await blobStream.on('finish', () => {
      console.log(`File ${'name'} uploaded successfully.`);
    });
    await blobStream.end(buffer);
    return { message: 'File uploaded successfully' };
  }

  async getFiles() {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles();
    const fileNames = files.map((file) => file.name);
    const fileURI = files.map((file) => file.publicUrl());
    return { files: fileNames, URI: fileURI };
  }
}
