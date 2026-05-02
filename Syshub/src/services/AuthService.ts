import api from "../api/client";
import type { Login } from "../models/Login";
import type { Registro } from "../models/Registro";

export const login = async (login: Login) => {
  const { data } = await api.post("/auth/login", login);

  localStorage.setItem("token", data.token);
  return data;
};

export const registro = async (usuario: Registro) => {
  return api.post("/auth/registro", usuario);
};

export const token = () => {
  const token = localStorage.getItem("token")!;
  return JSON.parse(atob(token.split(".")[1]));
};

export const logout = () => {
  localStorage.removeItem("token");
};
