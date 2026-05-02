import api from "../api/client";

export const publicar = async (titulo: string, contenido: string) => {
  return api.post("/foro", { titulo: titulo, contenido: contenido });
};

export const totalForos = async () => {
  return api.get("/foro/total");
};

export const forosPaginados = async (pagina: number) => {
  return api.get(`/foro/paginados/${pagina}`);
};

export const getForo = async (id: number) => {
  return api.get(`/foro/${id}`);
};

export const getComentarios = async (id: number) => {
  return api.get(`/foro/comentarios/${id}`);
};

export const comentar = async (id: number, comentario: string) => {
  return api.post("/foro/comentar", { idPublicacion: id, contenido: comentario });
};
