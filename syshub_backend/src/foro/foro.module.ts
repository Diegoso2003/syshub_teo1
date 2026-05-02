import { Module } from '@nestjs/common';
import { ForoController } from './foro.controller';
import { AuthModule } from '../auth/auth.module';
import { PublicacionService } from './publicacion/publicacion.service';

@Module({
  imports: [AuthModule],
  controllers: [ForoController],
  providers: [PublicacionService],
})
export class ForoModule {}
