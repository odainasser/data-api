import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerPlant } from './db/entities/power-plant.entity';
import { ImageFrame } from './db/entities/image-frame.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PowerPlantModule } from './modules/power-plant/power-plant.module';
import { ImageFrameModule } from './modules/image-frame/image-frame.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [PowerPlant, ImageFrame],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    PowerPlantModule,
    ImageFrameModule,
  ],
})
export class AppModule {}
