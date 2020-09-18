import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carpool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  type: number;

  @Column('timestamp')
  go_off: string;

  @Column()
  departure: string;

  @Column()
  destination: string;

  @Column('bigint')
  phone: number;

  @Column('timestamp')
  publishTime: string;
}
