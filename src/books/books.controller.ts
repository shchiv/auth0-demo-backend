import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.interface';
import { ValidationPipe } from '../common/validation.pipe';
import { CreateBookDto } from './create-book.dto';
import { AdminGuard } from '../common/admin.guard';

@Controller('books')
export class BooksController {
  private logger = new Logger('BooksController');
  constructor(private booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Post()
  @UseGuards(new AdminGuard())
  @UsePipes(new ValidationPipe())
  async create(@Body() createBookDto: CreateBookDto) {
    this.logger.verbose(
      `Book creating a new tasks. Data: ${JSON.stringify(createBookDto)}`,
    );
    return this.booksService.createBook(createBookDto);
  }
}
