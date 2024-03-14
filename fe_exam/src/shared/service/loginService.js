import { ENDPOINTS } from "../constants/ENDPOINTS";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const userLogin = async (userData) => {
  const response = await api.post(`${ENDPOINTS.LOGIN}`, userData);
  return response.data;
};
