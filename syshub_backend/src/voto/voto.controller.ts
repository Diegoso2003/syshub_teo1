import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { VotoService } from './voto.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { VotoDto } from './dto/voto.dto';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';

@UseGuards(JwtAuthGuard)
@Controller('voto')
export class VotoController {
  constructor(private readonly votoService: VotoService) {}

  @Post('publicaciones')
  async create(@Body() voto: VotoDto, @GetUsuario('id') usuarioId: number) {
    return await this.votoService.update(voto, usuarioId);
  }

  @Delete('publicaciones/:voto')
  async delete(@Param('voto') voto: string, @GetUsuario('id') usuarioId: number) {
    return await this.votoService.delete(+voto, usuarioId);
  }

  @Post('comentario')
  async comentarioVoto(@Body() voto: VotoDto, @GetUsuario('id') usuarioId: number) {
    return await this.votoService.votoComentario(voto, usuarioId);
  }

  @Delete('comentario/:voto')
  async deleteComentario(@Param('voto') voto: string, @GetUsuario('id') usuarioId: number) {
    return await this.votoService.deleteComentario(+voto, usuarioId);
  }
}
