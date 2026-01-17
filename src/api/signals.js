import api from "./axios";

export const getSignalsApi = async () => {
  const res = await api.get("/signals");
  return res.data;
};
