import { Module } from '@nestjs/common';
import { VotoService } from './voto.service';
import { VotoController } from './voto.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [VotoController],
  providers: [VotoService],
})
export class VotoModule {}
