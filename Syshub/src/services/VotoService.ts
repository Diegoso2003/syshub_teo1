import api from "../api/client";

export const votar = async (publicacion: number, voto: boolean) => {
  return api.post("/voto/publicaciones", { publicacion: publicacion, voto: voto });
};

export const eliminarVoto = async (publicacion: number) => {
  return api.delete(`/voto/publicaciones/${publicacion}`);
};

export const votarComentario = async (publicacion: number, voto: boolean) => {
  return api.post("/voto/comentario", { publicacion: publicacion, voto: voto });
};

export const eliminarVotoComentario = async (publicacion: number) => {
  return api.delete(`/voto/comentario/${publicacion}`);
};
