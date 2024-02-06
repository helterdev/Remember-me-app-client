'use client';
import { TaskInput } from '@/interfaces/TaskForm';
import { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface TaskProvider {
  state: [] | null;
}

export const TaskContext = createContext<TaskProvider>({} as TaskProvider);

export const TaskProvider = ({ children }: Props) => {
  const [state, setState] = useState<[] | null>(null);
  return (
    <TaskContext.Provider value={{ state }}>{children}</TaskContext.Provider>
  );
};
