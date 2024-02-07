'use client';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { TaskInput } from '@/interfaces/TaskForm';
import axios, { AxiosError, AxiosPromise } from 'axios';
import { Dispatch, createContext, useState } from 'react';
import { allTask, createTask } from '@/api/task';
import { useNotify } from '@/hooks/useNotify/useNotify';
interface Props {
  children: React.ReactNode;
}

interface TaskProvider {
  state: initialState | null;
  postTask: (data: TaskInput) => void;
  modalState: { openState: boolean; openSetState: Dispatch<boolean> };
  getAllTask: () => void;
}

interface DataTask {
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  __v: 0;
  _id: string;
  user: {
    createdAt: string;
    email: string;
    password: string;
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
  };
}

interface initialState {
  tasks: DataTask[] | [];
}
export const TaskContext = createContext<TaskProvider>({} as TaskProvider);

export const TaskProvider = ({ children }: Props) => {
  const [state, setState] = useState<initialState | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const notify = useNotify();

  const { isLoading, stopLoading } = useLoadingContext();

  const postTask = async (data: TaskInput) => {
    isLoading();
    try {
      const response = await createTask(data);
      if (response.status === 200) {
        return [stopLoading(), setOpen(false)];
      }
      if (response.status !== 200) {
        return [stopLoading(), notify('Error al agregar tarea', 500, 'error')];
      }
    } catch (error) {
      stopLoading();
      const axiosError = axios.isAxiosError(error);
      if (axiosError) {
        const err: AxiosError = error;
        if (err.code === 'ERR_NETWORK') {
          return notify('Lost connection', 500, 'error');
        }
        return notify(`${'Error al conectar con el servidor'}`, 500, 'error');
      }
    }
  };

  const getAllTask = async () => {
    isLoading();
    try {
      const response = await allTask();
      if (response.status === 200) {
        stopLoading();
        setState(response.data);
      } else {
        stopLoading();
        return notify('Error', 500, 'error');
      }
    } catch (error) {
      stopLoading();
      console.error(error);
    }
  };

  const modalState = {
    openState: open,
    openSetState: setOpen,
  };

  return (
    <TaskContext.Provider value={{ state, postTask, modalState, getAllTask }}>
      {children}
    </TaskContext.Provider>
  );
};
