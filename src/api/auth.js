import api from "./axios";

export const signupApi = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};

export const loginApi = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const meApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
