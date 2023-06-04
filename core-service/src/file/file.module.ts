import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controler';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'core-servise',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
