import { IsNumber, Matches } from 'class-validator';

export class ComentarioDto {
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Ingrese un rol valido' })
  idPublicacion!: number;
  @Matches(/\S/, {
    message: 'El contenido no puede ser solo espacios en blanco',
  })
  contenido!: string;
}
