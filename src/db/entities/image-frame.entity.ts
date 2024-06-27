import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageFrame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  depth: number;

  @Column('bytea')
  data: Uint8Array;
}
