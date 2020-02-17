import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  HttpModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { AuthenticationMiddleware } from './common/authentication.middleware';
import { BookRepository } from './books/book.repository';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BookRepository]),
    HttpModule,
  ],
  controllers: [
    AppController,
    BooksController,
    ShoppingCartController,
    AuthController,
  ],
  providers: [AppService, BooksService, AuthService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/books', method: RequestMethod.POST },
        { path: '/shopping-cart', method: RequestMethod.POST },
      );
  }
}
