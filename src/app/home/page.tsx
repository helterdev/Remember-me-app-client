'use client';

import { Pen } from '@/components/Pen/Pen';
import { TaskForm } from '@/components/TaskForm/TaskForm';
import { Trash } from '@/components/Trash/Trash';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { useTask } from '@/hooks/useTask/useTask';
import { useEffect } from 'react';

export default function Products() {
  const { getAllTask, state } = useTask();
  const { loading } = useLoadingContext();
  useEffect(() => {
    getAllTask();
  }, []);

  if (loading) {
    return (
      <div className='w-4/5 m-auto'>
        <div className='h-96 flex justify-center items-center'>Loading...</div>
      </div>
    );
  }

  if (state?.tasks === null || state?.tasks.length === 0) {
    return (
      <div className='w-4/5 m-auto'>
        <div className='flex justify-end py-4'>
          <TaskForm />
        </div>
        <p className='h-96 flex justify-center items-center text-slate-200 text-6xl font-medium'>
          No task to do
        </p>
      </div>
    );
  }

  return (
    <div className='w-4/5 m-auto'>
      <div className='flex justify-end py-4'>
        <TaskForm />
      </div>
      <div>
        <ul className='flex flex-col gap-4 py-4 justify-center sm: sm:flex-row sm:flex-wrap px-4'>
          {state?.tasks.map((task) => {
            return (
              <li
                key={task._id}
                className='box-border p-8 border flex flex-col rounded-xl gap-2 justify-around relative sm: w-56'
              >
                <div className='absolute top-[2px] right-[2px]'>
                  <Trash id={task._id} />
                </div>
                <div className='absolute top-[2px] right-[2rem]'>
                  <Pen id={task._id} />
                </div>
                <h2 className='font-bold text-base break-words'>
                  {task.title}
                </h2>
                <p className='text-sm break-words'>{task.description}</p>
                <span className='text-xs'>Author: {task.user.username}</span>
                <span className='text-xs'>
                  Date: {new Date(task.createdAt).toLocaleString()}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
