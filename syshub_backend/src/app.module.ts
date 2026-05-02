import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ForoModule } from './foro/foro.module';
import { BlogModule } from './blog/blog.module';
import { VotoModule } from './voto/voto.module';
import { PerfilModule } from './perfil/perfil.module';

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ForoModule,
    BlogModule,
    VotoModule,
    PerfilModule,
  ],
  controllers: [],
  providers: [PrismaService, BcryptService],
})
export class AppModule {}
