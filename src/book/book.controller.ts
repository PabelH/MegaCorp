import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Book } from './book.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener todos los libros' })
  @ApiResponse({ status: 200, description: 'Se ha realizado el retorno de libros correctamente.'}) 
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener libro por ID' })
  @ApiResponse({ status: 200, description: 'Se ha realizado el retorno del libro correctamente.'})  
  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Book | undefined> {
    return this.bookService.getBookById(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cargar Libro' })
  @ApiResponse({ status: 201, description: 'Libro agregado correctamente.'}) 
  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<Book> {
    return this.bookService.createBook(bookDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar Libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado correctamente.'})  
  @Patch(':id')
  async updateBook(@Param('id') id: number, @Body() bookDto: BookDto): Promise<Book | undefined> {
    return this.bookService.updateBook(id, bookDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar Libro' })
  @ApiResponse({ status: 200, description: 'Libro eliminado correctamente.'})  
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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Reservar libro' })
  @ApiResponse({ status: 200, description: 'Reservación creada.'})  
  @Patch(':id/reserve')
  async reserveBook(@Param('id') id: number): Promise<Book | undefined> {
    return this.bookService.reserveBook(id);
}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cancelar reservación' })
  @ApiResponse({ status: 200, description: 'Reservación Cancelada.'}) 
  @Patch(':id/cancel-reservation')
  async cancelReservation(@Param('id') id: number): Promise<Book | undefined> {
    return this.bookService.cancelReservation(id);
}
}
