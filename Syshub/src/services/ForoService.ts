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
