import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @Column()
  lastLogin_time: Date;

  @Column()
  is_valid: number;
}
