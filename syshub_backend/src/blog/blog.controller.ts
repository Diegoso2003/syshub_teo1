import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { GetUsuario } from '../auth/decorators/get-usuario/get-usuario.decorator';

@UseGuards(JwtAuthGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Roles(2, 4)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @GetUsuario('id') usuarioId: number) {
    return await this.blogService.create(createBlogDto, usuarioId);
  }

  @Get('total')
  async totalBlog() {
    return await this.blogService.totalBlogs();
  }

  @Get('paginados/:pagina')
  async findAll(@Param('pagina') pagina: number = 1, @GetUsuario('pagina') usuarioId: number) {
    return await this.blogService.obtenerBlogsPaginados(+pagina, usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
