import { IsString, MinLength, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0.01) // price > 0
  price: number;

  @IsNumber()
  @Min(0) // quantity >= 0
  quantity: number;

  @IsOptional()
  status?: boolean;
}
