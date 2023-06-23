import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;

  @IsString({
    each: true
  })
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsString({
    each: true
  })
  @IsArray()
  @IsOptional()
  tags?: string[]

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[]

}
