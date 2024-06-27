import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as exceljs from 'exceljs';
import { PowerPlant } from '../../db/entities/power-plant.entity';
import * as path from 'path';

@Injectable()
export class PowerPlantService {
  private readonly filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'egrid2022_data.xlsx',
  );

  constructor(
    @InjectRepository(PowerPlant)
    private powerPlantRepository: Repository<PowerPlant>,
  ) {}

  async findAll(): Promise<PowerPlant[]> {
    return this.powerPlantRepository.find();
  }

  async findTopN(n: number): Promise<PowerPlant[]> {
    return this.powerPlantRepository.find({
      order: { netGeneration: 'DESC' },
      take: n,
    });
  }

  async findByState(state: string): Promise<PowerPlant[]> {
    return this.powerPlantRepository.find({ where: { state } });
  }

  async save(plants: PowerPlant[]): Promise<void> {
    await this.powerPlantRepository.save(plants);
  }

  async ingestData(): Promise<void> {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(this.filePath);

    const worksheet = workbook.getWorksheet('PLNT22');
    if (!worksheet) {
      throw new Error('Worksheet not found');
    }

    const plants: PowerPlant[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const plant = new PowerPlant();
        plant.name = row.getCell(4).value?.toString() || '';
        plant.state = row.getCell(3).value?.toString() || '';
        const netGeneration = parseFloat(
          row.getCell(38).value?.toString() || '0',
        );
        const percentageOfState = parseFloat(
          row.getCell(44).value?.toString() || '0',
        );
        plant.netGeneration = isNaN(netGeneration) ? 0 : netGeneration;
        plant.percentageOfState = isNaN(percentageOfState)
          ? 0
          : percentageOfState;
        plants.push(plant);
      }
    });

    if (plants.length > 0) {
      await this.powerPlantRepository.save(plants);
    }
  }
}
