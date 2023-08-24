import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@Entity()
@Index(['title', 'author']) // Ejemplo de índice compuesto
export class Book {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  author: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  publisher: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  @IsInt()
  publishedYear: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isReserved: boolean;

  // book age
  calculateAge(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.publishedYear;
  }
}
