import { BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

export class ValidadorUsuario {
  private regexDigitos = /^\d{9}$/;
  private regexEmail = /^[\w-]+@[\w-]+(\.[a-zA-Z])+$/;
  public validar(usuario: CreateUsuarioDto) {
    this.validarCarnet(usuario);
    this.validarEmail(usuario);
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

  private validarEmail(usuario: CreateUsuarioDto) {
    if (!usuario.email || !this.regexEmail.test(usuario.email)) {
      throw new BadRequestException('Ingresar un email valido');
    }
  }

  private validarCarnet(usuario: CreateUsuarioDto) {
    if (!usuario.carnet || !this.regexDigitos.test(usuario.carnet) || usuario.carnet[0] === '0') {
      throw new BadRequestException('Ingresar un carnet valido');
    }
    const primeros4 = parseInt(usuario.carnet.substring(0, 4));
    const añoActual = new Date().getFullYear();
    if (primeros4 < 1989 || primeros4 > añoActual) {
      throw new BadRequestException('Ingresar un carnet valido.');
    }
  }
}
