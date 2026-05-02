import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateForoDto {
  @IsString({ message: 'envie un titulo valido' })
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MaxLength(200, { message: 'El título no puede tener más de 200 caracteres' })
  titulo!: string;
  @IsString({ message: 'envie un contenido valido' })
  @IsNotEmpty({ message: 'una publicación debe tener contenido' })
  @Matches(/\S/, {
    message: 'El contenido no puede ser solo espacios en blanco',
  })
  contenido!: string;
}
