import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ForoService } from './foro.service';
import { CreateForoDto } from './dto/create-foro.dto';
import { UpdateForoDto } from './dto/update-foro.dto';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('foro')
export class ForoController {
  constructor(private readonly foroService: ForoService) {}

  @Post()
  async create(@Body() createForoDto: CreateForoDto, @GetUsuario('id') usuarioId: number) {
    return await this.foroService.create(createForoDto, usuarioId);
  }

  @Get('total')
  async totalForos() {
    return await this.foroService.totalForos();
  }

  @Get('paginados/:pagina')
  async findAll(@Param('pagina') pagina: number = 1, @GetUsuario('pagina') usuarioId: number) {
    return await this.foroService.obtenerForosPaginados(+pagina, usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foroService.findOne(+id);
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
