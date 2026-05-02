import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createBlogDto: CreateBlogDto, usuarioId: number) {
    const blog = {
      titulo: createBlogDto.tema,
      contenido: createBlogDto.contenido,
      blog: true,
      usuario_id: usuarioId,
    };
    return await this.prisma.post.create({
      data: blog,
    });
  }

  async totalBlogs(): Promise<number> {
    const total = await this.prisma.post.count({
      where: {
        blog: true,
        estado: true,
      },
    });
    return total;
  }

  async obtenerBlogsPaginados(pagina: number, usuarioId: number) {
    if (pagina < 1) pagina = 1;
    return await this.prisma.$queryRaw`
      SELECT 
        p.id,
        p.titulo,
        p.contenido,
        p.fecha,

        u.id AS usuario_id,
        u.nombre AS usuario_nombre,

        (
          SELECT COUNT(*)::INTEGER
          FROM comentario c 
          WHERE c.post_id = p.id AND c.estado = true
        ) AS comentarios,

        (
          SELECT COALESCE(SUM(v.valor), 0)::INTEGER
          FROM voto v
          WHERE v.post_id = p.id
        ) AS total,

        (
          SELECT COUNT(*)::INTEGER
          FROM voto v
          WHERE v.post_id = p.id AND v.valor = 1
        ) AS likes,

        (
          SELECT COUNT(*)::INTEGER
          FROM voto v
          WHERE v.post_id = p.id AND v.valor = -1
        ) AS dislikes,

        CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM voto v 
        WHERE v.post_id = p.id 
          AND v.usuario_id = ${usuarioId}
          AND v.valor = 1
      ) THEN true 
      ELSE false 
    END AS dio_like,

    CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM voto v 
        WHERE v.post_id = p.id 
          AND v.usuario_id = ${usuarioId}
          AND v.valor = -1
      ) THEN true 
      ELSE false 
    END AS dio_dislike

      FROM post p
      JOIN usuario u ON u.id = p.usuario_id

      WHERE p.estado = true AND p.blog = true

      ORDER BY 
        p.fecha DESC,
        total DESC

      LIMIT 20 OFFSET ${(pagina - 1) * 20};
  `;
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
