import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { ValidadorUsuario } from './validador-usuario';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ValidadorUsuario],
  controllers: [UsuarioController],
  providers: [UsuarioService, BcryptService],
})
export class UsuarioModule {}
