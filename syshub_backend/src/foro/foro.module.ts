import { Module } from '@nestjs/common';
import { ForoService } from './foro.service';
import { ForoController } from './foro.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ForoController],
  providers: [ForoService],
})
export class ForoModule {}
