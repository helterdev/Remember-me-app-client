'use client';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { TaskInput } from '@/interfaces/TaskForm';
import axios, { AxiosError, AxiosPromise } from 'axios';
import { Dispatch, createContext, useState } from 'react';
import { allTask, createTask, deleteRequest, getIdTask } from '@/api/task';
import { useNotify } from '@/hooks/useNotify/useNotify';
interface Props {
  children: React.ReactNode;
}

interface TaskProvider {
  state: initialState | null;
  postTask: (data: TaskInput) => void;
  modalState: { openState: boolean; openSetState: Dispatch<boolean> };
  getAllTask: () => void;
  deleteTask: (id: string) => void;
  editModalState: { editOpen: boolean; setEditOpen: Dispatch<boolean> };
  getTask: (id: string) => void;
  task: TaskData | null;
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

interface TaskData {
  task: { title: string; description: string };
}

export const TaskContext = createContext<TaskProvider>({} as TaskProvider);

export const TaskProvider = ({ children }: Props) => {
  const [state, setState] = useState<initialState | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [task, setTask] = useState<TaskData | null>(null);

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

  const getTask = async (id: string) => {
    try {
      const response = await getIdTask(id);
      if (response.statusText === 'OK') {
        return setTask(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await deleteRequest(id);
      if (response.statusText === 'OK') {
        const newState: initialState = {
          ...state,
          //@ts-ignore
          tasks: state?.tasks.filter((task) => task._id !== id),
        };
        setState(newState);
      }
    } catch (error) {}
  };

  const modalState = {
    openState: open,
    openSetState: setOpen,
  };

  const editModalState = {
    editOpen,
    setEditOpen,
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        postTask,
        modalState,
        getAllTask,
        deleteTask,
        editModalState,
        getTask,
        task,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
