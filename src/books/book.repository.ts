import { Repository, EntityMetadata, EntityRepository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  private logger = new Logger('BookRepository');

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, price } = createBookDto;

    const book = new Book();
    book.title = title;
    book.price = price;

    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return book;
  }

  async getBooks(): Promise<Book[]> {
    const query = this.createQueryBuilder('book');

    try {
      const books = await query.getMany();
      return books;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
