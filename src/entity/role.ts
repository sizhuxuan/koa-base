import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @Column()
  is_valid: number;

  @Column()
  description: string;
}
