import api from "./axios";

export const billingStatusApi = async () => {
  const res = await api.get("/billing/status");
  return res.data;
};

export const createCheckoutApi = async () => {
  const res = await api.post("/billing/create-checkout");
  return res.data;
};
