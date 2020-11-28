import { IsIn, IsMongoId, IsNumber, IsString, Max, Min, MinLength} from 'class-validator';

export class CreateProductDto {
  id: string;

  @IsString()
  @MinLength(5, {message: 'O nome deve ter mais que 5 caracteres.'}) 
  nome: string;

  marca: string;

  @IsNumber()
  preco: number;

  @IsString()
  codigoOriginal: string;
}
