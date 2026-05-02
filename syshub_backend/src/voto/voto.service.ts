import { Injectable } from '@nestjs/common';
import { VotoDto } from './dto/voto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotoService {
  async delete(voto: number, usuarioId: number) {
    return await this.prisma.voto.deleteMany({
      where: {
        usuario_id: usuarioId,
        post_id: voto,
      },
    });
  }

  constructor(private readonly prisma: PrismaService) {}
  async update(voto: VotoDto, usuarioId: number) {
    const nuevoValor = voto.voto ? 1 : -1;
    const postId = voto.publicacion;
    return await this.prisma.voto.upsert({
      where: {
        usuario_id_post_id: {
          usuario_id: usuarioId,
          post_id: postId,
        },
      },
      update: {
        valor: nuevoValor,
      },
      create: {
        usuario_id: usuarioId,
        post_id: postId,
        valor: nuevoValor,
      },
    });
  }
}
