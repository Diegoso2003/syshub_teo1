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
  }

  login(usuario: { carnet: string; email: string; rol: number; estado: boolean; password: string; nombre: string }): {
    access_token: string;
  } {
    const payload: JwtPayload = {
      rol: usuario.rol,
      carnet: usuario.carnet,
    };
    const token: string = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
