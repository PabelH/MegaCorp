import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Book | undefined> {
    return this.bookService.getBookById(id);
  }

  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.createBook(bookDto);
  }

  @Patch(':id')
  async updateBook(@Param('id') id: number, @Body() bookDto: BookDto): Promise<Book | undefined> {
    return this.bookService.updateBook(id, bookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.bookService.deleteBook(id);
      return { message: 'Book deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Book not found');
      }
      throw error;
    }
  }
}
