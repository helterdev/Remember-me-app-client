import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonEdit } from '../UI/ButtonEdit/ButtonEdit';
import { Button } from '../UI/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/alert-dialog';
import { TaskInput } from '@/interfaces/TaskForm';
import { useTask } from '@/hooks/useTask/useTask';
import { useEffect } from 'react';

interface Props {
  id: string;
}

export const Pen = ({ id }: Props) => {
  const {
    editModalState: { setEditOpen, editOpen },
    getTask,
    task,
  } = useTask();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskInput>();

  if (task?.task) {
    setValue('title', task.task.title);
    setValue('description', task.task.description);
  }

  const onsubmit: SubmitHandler<TaskInput> = async (data) => {};
  return (
    <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
      <AlertDialogTrigger asChild>
        <span onClick={() => getTask(id)}>
          <ButtonEdit />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit the task</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className='py-6 flex justify-center items-center flex-col gap-4'>
            <div className='w-full'>
              <label>
                <input
                  type='text'
                  id='title'
                  className='text-black h-10 px-2 outline-none rounded-sm w-full border font-semibold'
                  placeholder='Title'
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'Este campo es requerido',
                    },
                  })}
                />
              </label>
              {errors.title && (
                <span role='alter' className='text-red-500 text-xs'>
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className='w-full'>
              <label>
                <input
                  type='text'
                  id='description'
                  className='text-black h-10 px-2 outline-none rounded-sm w-full border text-sm'
                  placeholder='Description'
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'Este campo es requerido',
                    },
                  })}
                />
              </label>
              {errors.description && (
                <span role='alter' className='text-red-500 text-xs'>
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex justify-between'>
            <Button type='submit' className=' bg-green-700 hover:bg-green-800'>
              Editar
            </Button>
            <Button
              type='button'
              variant={'destructive'}
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
