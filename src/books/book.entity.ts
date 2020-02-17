import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;
}
