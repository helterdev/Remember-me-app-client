import { InputsLogin, InputsRegister } from "@/interfaces/Data";
import axios from "./axios.config";

export const userRegister = async (data: InputsRegister) => {
  const response = await axios.post(`/register`, data);

  return response;
};

export const loginRequest = async (data: InputsLogin) => {
  return await axios.post(`/login`, data);
};

export const logout = async () => {
  return await axios.post("/logout");
};
