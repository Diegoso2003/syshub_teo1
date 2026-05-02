import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';
import { PublicacionService } from '../foro/publicacion/publicacion.service';
import { CreateForoDto } from '../foro/dto/create-foro.dto';

@UseGuards(JwtAuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: PublicacionService) {}

  @Roles(2, 4)
  @Post()
  async create(@Body() createBlogDto: CreateForoDto, @GetUsuario('id') usuarioId: number) {
    return await this.blogService.create(createBlogDto, usuarioId, true);
  }

  @Get('total')
  async totalBlog() {
    return await this.blogService.totalForos(true);
  }

  @Get('paginados/:pagina')
  async findAll(@Param('pagina') pagina: number = 1, @GetUsuario('id') usuarioId: number) {
    return await this.blogService.obtenerForosPaginados(+pagina, usuarioId, true);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUsuario('id') usuarioId: number) {
    return this.blogService.findOne(+id, usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
