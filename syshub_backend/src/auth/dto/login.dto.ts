import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Login {
  @IsEmail({}, { message: 'Ingrese un email valido.' })
  email!: string;
  @IsString({ message: 'Ingrese su contraseña.' })
  @IsNotEmpty({ message: 'Ingrese su contraseña.' })
  password!: string;
}
