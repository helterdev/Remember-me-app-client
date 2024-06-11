import { TaskInput } from "@/interfaces/TaskForm";
import axios from "./axios.config";

export const createTask = async (data: TaskInput) => {
  return await axios.post("/auth/task", data);
};

export const allTask = async () => {
  return await axios.get("/auth/task");
};

export const getIdTask = async (id: string) => {
  return await axios.get(`/auth/task/${id}`);
};

export const updateTask = async (id: string, data: TaskInput) => {
  return axios.put(`/auth/task/${id}`, data);
};

export const deleteRequest = async (id: string) => {
  return axios.delete(`/auth/task/${id}`);
};
