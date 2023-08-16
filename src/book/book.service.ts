import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book | undefined> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async createBook(bookDto: BookDto): Promise<Book> {
    const book = this.bookRepository.create(bookDto);
    return this.bookRepository.save(book);
  }

  async updateBook(id: number, bookDto: BookDto): Promise<Book | undefined> {
    await this.bookRepository.update(id, bookDto);
    return this.bookRepository.findOne({ where: { id } });
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.bookRepository.delete(id);
  }
}
