import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { PublicacionService } from './publicacion/publicacion.service';
import { ComentarioDto } from './dto/comentario.dto';

@UseGuards(JwtAuthGuard)
@Controller('foro')
export class ForoController {
  constructor(private readonly foroService: PublicacionService) {}

  @Post()
  async create(@Body() createForoDto: CreateForoDto, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.create(createForoDto, usuarioId, false);
  }

  @Get('total')
  async totalForos() {
    return await this.foroService.totalForos(false);
  }

  @Get('paginados/:pagina')
  async findAll(@Param('pagina') pagina: number = 1, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.obtenerForosPaginados(+pagina, usuarioId, false);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.findOne(+id, usuarioId);
  }

  @Get('comentarios/:id')
  async comentarios(@Param('id') id: string, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.obtenerComentarios(+id, usuarioId);
  }

  @Post('comentar')
  async comentar(@Body() comentario: ComentarioDto, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.comentar(comentario, usuarioId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForoDto: UpdateForoDto) {
    return this.foroService.update(+id, updateForoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foroService.remove(+id);
  }
}
