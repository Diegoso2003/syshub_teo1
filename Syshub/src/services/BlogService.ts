import api from "../api/client";

export const publicarBlog = async (tema: string, contenido: string) => {
  return api.post("/blog", { tema: tema, contenido: contenido });
};

export const totalBlogs = async () => {
  return api.get("/blog/total");
};

export const blogsPaginados = async (pagina: number) => {
  return api.get(`/blog/paginados/${pagina}`);
};
