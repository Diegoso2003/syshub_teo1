import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validarLogin(login: Login) {
    const email = login.email;
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) {
      throw new UnauthorizedException('Email o contraseña incorrectos.');
    }
    const valido = await this.bcrypt.validarPassword(login.password, usuario.password);
    if (!valido) {
      throw new UnauthorizedException('Email o contraseña incorrectos.');
    }
    if (!usuario.estado) {
      throw new UnauthorizedException('Usuario suspendido');
    }
    return this.login(usuario);
  }

  login(usuario: { id: number; email: string; rol: number; estado: boolean; password: string; nombre: string }): {
    token: string;
  } {
    const payload: JwtPayload = {
      rol: usuario.rol,
      id: usuario.id,
    };
    const token: string = this.jwtService.sign(payload);
    return {
      token: token,
    };
  }
}
