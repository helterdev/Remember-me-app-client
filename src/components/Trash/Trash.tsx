import { useTask } from '@/hooks/useTask/useTask';
import { ButtonDelete } from '../UI/ButtonDelete/ButtonDelete';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/alert-dialog';
interface Props {
  id: string;
}
export const Trash = ({ id }: Props) => {
  const { deleteTask } = useTask();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <ButtonDelete />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this task?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className=' bg-red-500 hover:bg-red-600'
            onClick={() => deleteTask(id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
