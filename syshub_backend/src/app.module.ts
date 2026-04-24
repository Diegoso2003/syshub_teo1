import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [],
  providers: [PrismaService, BcryptService],
})
export class AppModule {}
