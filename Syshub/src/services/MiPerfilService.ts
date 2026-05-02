import api from "../api/client";

export const totalBlogsPub = async () => {
  return api.get("/perfil/totalBlogs");
};

export const totalForosPub = async () => {
  return api.get("/perfil/totalForos");
};

export const blogsPaginadosPerfil = async (pagina: number) => {
  return api.get(`/perfil/blogs/${pagina}`);
};

export const forosPaginadosPerfil = async (pagina: number) => {
  return api.get(`/perfil/foros/${pagina}`);
};
