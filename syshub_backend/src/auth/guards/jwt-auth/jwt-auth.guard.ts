/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import { ROLES_KEY } from '../../decorators/roles/roles.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['usuario'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id: payload.id },
      select: { id: true, rol: true, estado: true, email: true },
    });

    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
    if (!usuario.estado) throw new ForbiddenException('Usuario suspendido');

    const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles && !requiredRoles.includes(usuario.rol)) {
      throw new ForbiddenException('No tienes permisos');
    }

    request['user'] = usuario;
    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
