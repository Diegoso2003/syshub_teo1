export interface Comentario {
  id: number;
  contenido: string;
  fecha: string;
  padre_id: number | null;
  usuario_id: number;
  usuario_nombre: string;
  total: number;
  likes: number;
  dislikes: number;
  dio_like: boolean;
  dio_dislike: boolean;
}