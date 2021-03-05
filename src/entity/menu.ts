import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @Column()
  status: number;

  @Column()
  path: string;

  @Column()
  component: string;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column()
  level: number;

  @Column()
  parent_id: number;
}
