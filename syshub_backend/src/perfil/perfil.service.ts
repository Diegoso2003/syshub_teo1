import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerfilService {
  constructor(private readonly prisma: PrismaService) {}

  async totalPublicaciones(usuarioId: number, blog: boolean) {
    const total = await this.prisma.post.count({
      where: {
        blog: blog,
        estado: true,
        usuario_id: usuarioId,
      },
    });
    return total;
  }
  async publicaciones(pagina: number, usuarioId: number, blog: boolean) {
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
          AND p.usuario_id = ${usuarioId}

        ORDER BY 
          p.fecha DESC

        LIMIT 20 OFFSET ${(pagina - 1) * 20};
  `;
  }
}
