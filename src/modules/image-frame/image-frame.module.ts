import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageFrame } from '../../db/entities/image-frame.entity';
import { ImageFrameService } from './image-frame.service';
import { ImageFrameController } from './image-frame.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImageFrame])],
  providers: [ImageFrameService],
  controllers: [ImageFrameController],
})
export class ImageFrameModule {}
