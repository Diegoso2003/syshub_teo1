import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateForoDto } from '../dto/create-foro.dto';
import { UpdateForoDto } from '../dto/update-foro.dto';
import { ComentarioDto } from '../dto/comentario.dto';

@Injectable()
export class PublicacionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createForoDto: CreateForoDto, usuarioId: number, blog: boolean) {
    const foro = {
      titulo: createForoDto.titulo,
      contenido: createForoDto.contenido,
      blog: blog,
      usuario_id: usuarioId,
    };
    return await this.prisma.post.create({
      data: foro,
    });
  }

  async totalForos(blog: boolean): Promise<number> {
    const total = await this.prisma.post.count({
      where: {
        blog: blog,
        estado: true,
      },
    });
    return total;
  }

  async obtenerForosPaginados(pagina: number, usuarioId: number, blog: boolean) {
    if (pagina < 1) pagina = 1;
    return await this.prisma.$queryRaw`
      SELECT 
          p.id,
          p.titulo,
          p.contenido,
          p.fecha,

          u.id AS usuario_id,
          u.nombre AS usuario_nombre,

          c.comentarios,
          v.total,
          v.likes,
          v.dislikes,
          v.dio_like,
          v.dio_dislike

        FROM post p
        JOIN usuario u ON u.id = p.usuario_id

        LEFT JOIN LATERAL (
          SELECT COUNT(*)::INTEGER AS comentarios
          FROM comentario c
          WHERE c.post_id = p.id AND c.estado = true
        ) c ON true

        LEFT JOIN LATERAL (
          SELECT 
            COALESCE(SUM(valor), 0)::INTEGER AS total,
            COUNT(*) FILTER (WHERE valor = 1)::INTEGER AS likes,
            COUNT(*) FILTER (WHERE valor = -1)::INTEGER AS dislikes,
            BOOL_OR(valor = 1 AND usuario_id = 1) AS dio_like,
            BOOL_OR(valor = -1 AND usuario_id = 1) AS dio_dislike
          FROM voto
          WHERE post_id = p.id
        ) v ON true

        WHERE 
          p.estado = true 
          AND p.blog = ${blog}

        ORDER BY 
          p.fecha DESC,
          v.total DESC

        LIMIT 20 OFFSET ${(pagina - 1) * 20};
  `;
  }

  findAll() {
    return `This action returns all foro`;
  }

  async findOne(id: number, usuarioId: number) {
    const publicacion = await this.prisma.$queryRaw`
    SELECT 
          p.id,
          p.titulo,
          p.contenido,
          p.fecha,
          u.id AS usuario_id,
          u.nombre AS usuario_nombre,

          (
            SELECT COUNT(*) 
            FROM comentario c 
            WHERE c.post_id = p.id AND c.estado = true
          )::INTEGER AS comentarios,

          (
            SELECT COALESCE(SUM(v.valor), 0)
            FROM voto v
            WHERE v.post_id = p.id
          )::INTEGER AS total,

          (
            SELECT COUNT(*)
            FROM voto v
            WHERE v.post_id = p.id AND v.valor = 1
          )::INTEGER AS likes,

          (
            SELECT COUNT(*)
            FROM voto v
            WHERE v.post_id = p.id AND v.valor = -1
          )::INTEGER AS dislikes,

          EXISTS (
            SELECT 1 
            FROM voto v 
            WHERE v.post_id = p.id 
              AND v.usuario_id = ${usuarioId} 
              AND v.valor = 1
          ) AS dio_like,

          EXISTS (
            SELECT 1 
            FROM voto v 
            WHERE v.post_id = p.id 
              AND v.usuario_id = ${usuarioId} 
              AND v.valor = -1
          ) AS dio_dislike

        FROM post p
        JOIN usuario u ON u.id = p.usuario_id
        WHERE p.id = ${id} AND p.estado = true;
            `;
    if (!publicacion) {
      throw new BadRequestException('No se encontro la publicacion');
    }
    return publicacion;
  }

  async obtenerComentarios(postId: number, usuarioId: number) {
    return await this.prisma.$queryRaw`
        SELECT 
          c.id,
          c.contenido,
          c.fecha,
          c.padre_id,

          u.id AS usuario_id,
          u.nombre AS usuario_nombre,

          v.total,
          v.likes,
          v.dislikes,
          v.dio_like,
          v.dio_dislike

        FROM comentario c
        JOIN usuario u ON u.id = c.usuario_id

        LEFT JOIN LATERAL (
          SELECT 
            COALESCE(SUM(valor), 0)::INTEGER AS total,
            COUNT(*) FILTER (WHERE valor = 1)::INTEGER AS likes,
            COUNT(*) FILTER (WHERE valor = -1)::INTEGER AS dislikes,
            BOOL_OR(valor = 1 AND usuario_id = ${usuarioId}) AS dio_like,
            BOOL_OR(valor = -1 AND usuario_id = ${usuarioId}) AS dio_dislike
          FROM voto
          WHERE comentario_id = c.id
        ) v ON true

        WHERE 
          c.post_id = ${postId}
          AND c.estado = true

          ORDER BY 
          c.fecha DESC,
          v.total DESC;
    `;
  }

  async comentar(comentario: ComentarioDto, usuarioId: number) {
    const nuevo = {
      post_id: comentario.idPublicacion,
      contenido: comentario.contenido,
      usuario_id: usuarioId,
    };
    return await this.prisma.comentario.create({
      data: nuevo,
    });
  }

  update(id: number, updateForoDto: UpdateForoDto) {
    return `This action updates a #${id} foro`;
  }

  remove(id: number) {
    return `This action removes a #${id} foro`;
  }
}
