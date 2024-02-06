'use client';

import { TaskForm } from '@/components/TaskForm/TaskForm';

export default function Products() {
  return (
    <div className='w-4/5 m-auto'>
      <div className='flex justify-end py-4'>
        <TaskForm />
      </div>
    </div>
  );
}
