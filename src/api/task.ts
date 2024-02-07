import { TaskInput } from '@/interfaces/TaskForm';
import axios from './conifg';

export const createTask = async (data: TaskInput) => {
  return await axios.post('/task', data);
};

export const allTask = async () => {
  return await axios.get('/task');
};

export const getIdTask = async () => {
  return await axios.get('/task');
};
