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

  // Método para calcular la antigüedad del libro
  calculateAge(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.publishedYear;
  }
}
