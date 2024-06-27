import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PowerPlant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column('float')
  netGeneration: number;

  @Column('float')
  percentageOfState: number;
}
