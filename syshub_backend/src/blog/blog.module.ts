import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { AuthModule } from '../auth/auth.module';
import { PublicacionService } from '../foro/publicacion/publicacion.service';

@Module({
  imports: [AuthModule],
  controllers: [BlogController],
  providers: [PublicacionService],
})
export class BlogModule {}
