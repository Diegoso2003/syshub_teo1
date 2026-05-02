import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'envie un tema valido' })
  @Transform(({ value }) => (value as string).trim())
  @IsNotEmpty({ message: 'El tema no puede estar vacío' })
  @MaxLength(200, { message: 'El tema no puede tener más de 200 caracteres' })
  tema!: string;
  @IsString({ message: 'envie un contenido valido' })
  @IsNotEmpty({ message: 'una publicación debe tener contenido' })
  @Matches(/\S/, {
    message: 'El contenido no puede ser solo espacios en blanco',
  })
  contenido!: string;
}
