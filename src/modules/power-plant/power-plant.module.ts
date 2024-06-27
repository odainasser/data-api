import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerPlant } from '../../db/entities/power-plant.entity';
import { PowerPlantService } from './power-plant.service';
import { PowerPlantController } from './power-plant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PowerPlant])],
  providers: [PowerPlantService],
  controllers: [PowerPlantController],
})
export class PowerPlantModule {}
