import { BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

export class ValidadorUsuario {
  public validar(usuario: CreateUsuarioDto) {
    this.validarContraseña(usuario);
    this.validarNombre(usuario);
  }

  private validarNombre(usuario: CreateUsuarioDto) {
    if (!usuario.nombre || usuario.nombre.trim().length === 0) {
      throw new BadRequestException('Ingrese su nombre correctamente.');
    }
  }

  private validarContraseña(usuario: CreateUsuarioDto) {
    if (!usuario.password || usuario.password.trim().length === 0) {
      throw new BadRequestException('Ingresar una contraseña valida.');
    }
    if (usuario.password.length < 7 || usuario.password.length > 70) {
      throw new BadRequestException('La contraseña debe tener una longitud entre 7 y 70 caracteres.');
    }
    if (usuario.password !== usuario.confirPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }
  }
}
