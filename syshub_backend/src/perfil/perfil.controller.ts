import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';

@UseGuards(JwtAuthGuard)
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Get('foros/:pagina')
  async forosCreados(@Param('pagina') pagina: string, @GetUsuario('id') usuarioId: number) {
    return await this.perfilService.publicaciones(+pagina, usuarioId, false);
  }

  @Get('blogs/:pagina')
  async blogsCreados(@Param('pagina') pagina: string, @GetUsuario('id') usuarioId: number) {
    return await this.perfilService.publicaciones(+pagina, usuarioId, true);
  }

  @Get('totalBlogs')
  async totalBlogs(@GetUsuario('id') usuarioId: number) {
    return await this.perfilService.totalPublicaciones(usuarioId, true);
  }

  @Get('totalForos')
  async totalForos(@GetUsuario('id') usuarioId: number) {
    return await this.perfilService.totalPublicaciones(usuarioId, true);
  }
}
