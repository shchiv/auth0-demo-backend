import { Injectable } from '@nestjs/common';
import { Book } from './book.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.getBooks();
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }
}
