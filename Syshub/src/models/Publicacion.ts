export interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  usuario_id: number;
  usuario_nombre: string;
  comentarios: number;
  total: number;
  likes: number;
  dislikes: number;
  dio_like: boolean;
  dio_dislike: boolean;
}