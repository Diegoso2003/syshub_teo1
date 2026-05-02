import { IsBoolean, IsNumber } from 'class-validator';

export class VotoDto {
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Ingrese un id valido' })
  publicacion!: number;
  @IsBoolean({ message: 'Ingrese un voto valido' })
  voto!: boolean;
}
