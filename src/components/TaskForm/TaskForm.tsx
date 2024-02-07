'use client';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/alert-dialog';
import { Button as FormButton } from '../UI/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskInput } from '@/interfaces/TaskForm';
import { useTask } from '@/hooks/useTask/useTask';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { Loader } from '../UI/Loader/Loader';
export const TaskForm = () => {
  const {
    postTask,
    modalState: { openState, openSetState },
  } = useTask();
  const { loading } = useLoadingContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskInput>();

  const onsubmit: SubmitHandler<TaskInput> = async (data) => {
    postTask(data);
  };
  return (
    <>
      <AlertDialog open={openState} onOpenChange={openSetState}>
        <AlertDialogTrigger asChild>
          <FormButton variant='outline' className=' font-semibold'>
            Add Task +
          </FormButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>New Task</AlertDialogTitle>
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
              <FormButton type='submit'>
                {loading ? <Loader /> : 'Add'}
              </FormButton>
              <FormButton
                type='button'
                variant={'destructive'}
                onClick={() => openSetState(false)}
              >
                Cancel
              </FormButton>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
