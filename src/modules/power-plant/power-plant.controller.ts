import { Controller, Get, Post, Query } from '@nestjs/common';
import { PowerPlantService } from './power-plant.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('power-plant')
@Controller('power-plant')
export class PowerPlantController {
  constructor(private readonly powerPlantService: PowerPlantService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all power plants' })
  @ApiResponse({ status: 200, description: 'Return all power plants' })
  findAll() {
    return this.powerPlantService.findAll();
  }

  @Get('top')
  @ApiOperation({ summary: 'Retrieve top N power plants by net generation' })
  @ApiQuery({
    name: 'n',
    type: Number,
    description: 'Number of top power plants to retrieve',
  })
  @ApiResponse({ status: 200, description: 'Return top N power plants' })
  findTopN(@Query('n') n: number) {
    return this.powerPlantService.findTopN(n);
  }

  @Get('state')
  @ApiOperation({ summary: 'Retrieve power plants by state' })
  @ApiQuery({
    name: 'state',
    type: String,
    description: 'State to filter power plants',
  })
  @ApiResponse({ status: 200, description: 'Return power plants by state' })
  findByState(@Query('state') state: string) {
    return this.powerPlantService.findByState(state);
  }

  @Post('ingest')
  @ApiOperation({ summary: 'Ingest power plant data from a file' })
  @ApiResponse({ status: 201, description: 'Data ingested successfully' })
  async ingestData() {
    await this.powerPlantService.ingestData();
    return { message: 'Data Ingested' };
  }
}
