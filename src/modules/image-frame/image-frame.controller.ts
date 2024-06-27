import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFrameService } from './image-frame.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { Express } from 'express';

@ApiTags('image-frame')
@Controller('image-frame')
export class ImageFrameController {
  constructor(private readonly imageFrameService: ImageFrameService) {}

  @Get('range')
  @ApiOperation({ summary: 'Get image frames by depth range' })
  @ApiQuery({
    name: 'depthMin',
    type: Number,
    description: 'Minimum depth value',
  })
  @ApiQuery({
    name: 'depthMax',
    type: Number,
    description: 'Maximum depth value',
  })
  @ApiResponse({ status: 200, description: 'Return image frames' })
  findByDepthRange(
    @Query('depthMin') depthMin: number,
    @Query('depthMax') depthMax: number,
  ) {
    return this.imageFrameService.findByDepthRange(depthMin, depthMax);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload CSV file with image data' })
  @ApiResponse({
    status: 201,
    description: 'CSV file processed and image frames saved',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvData = file.buffer.toString('utf-8');
    await this.imageFrameService.ingestData(csvData);
    return { message: 'Image frames saved' };
  }
}
