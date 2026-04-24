import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'ingresar un carnet valido.' })
  carnet!: string;
  @IsString({ message: 'Ingrese un nombre valido.' })
  @IsNotEmpty({ message: 'Ingrese un nombre valido.' })
  nombre: string = '';
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Ingrese un rol valido.' })
  rol!: number;
  @IsString({ message: 'Ingrese una contraseña valida.' })
  @Length(7, 70, { message: 'La contraseña debe tener entre 7 y 70 caracteres.' })
  password!: string;
  @IsString({ message: 'Ingrese la confirmacion de la contraseña.' })
  @IsNotEmpty({ message: 'Ingrese la confirmacion de la contraseña.' })
  confirPassword!: string;
  @IsEmail({}, { message: 'ingrese un email valido.' })
  email!: string;
}
