import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ImageFrame } from '../../db/entities/image-frame.entity';
import * as sharp from 'sharp';

@Injectable()
export class ImageFrameService {
  constructor(
    @InjectRepository(ImageFrame)
    private imageFrameRepository: Repository<ImageFrame>,
  ) {}

  async resizeImage(data: Buffer, width: number): Promise<Buffer> {
    return sharp(data).resize({ width }).toBuffer();
  }

  async applyColorMap(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer).modulate({ saturation: 1.5 }).toBuffer();
  }

  async findByDepthRange(
    depthMin: number,
    depthMax: number,
  ): Promise<ImageFrame[]> {
    return this.imageFrameRepository.find({
      where: { depth: Between(depthMin, depthMax) },
    });
  }

  async save(imageFrame: ImageFrame): Promise<void> {
    await this.imageFrameRepository.save(imageFrame);
  }

  async ingestData(csvData: string): Promise<void> {
    const rows = csvData.split('\n');
    for (const row of rows.slice(1)) {
      const columns = row.split(',');
      const depth = parseFloat(columns[0]);
      const pixelValues = columns.slice(1, 201).map(Number);

      const pixelArray = new Uint8Array(pixelValues);
      const buffer = Buffer.from(pixelArray);

      if (buffer.length === 0) {
        console.error('Buffer is empty for row:', row);
        continue;
      }

      const rawImageBuffer = await sharp(buffer, {
        raw: {
          width: 200,
          height: 1,
          channels: 1,
        },
      })
        .png()
        .toBuffer();

      const resizedImageBuffer = await this.resizeImage(rawImageBuffer, 150);

      const colorMappedImageBuffer =
        await this.applyColorMap(resizedImageBuffer);

      const imageFrame = new ImageFrame();
      imageFrame.depth = depth;
      imageFrame.data = colorMappedImageBuffer;

      await this.save(imageFrame);
    }
  }
}
