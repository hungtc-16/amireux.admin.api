import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("user")
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  refresh_token: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}