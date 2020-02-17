import { IsString, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString() readonly title: string;

  @IsInt() readonly price: number;
}
