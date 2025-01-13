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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { FC } from "react";

interface ModalDeleteProps {
  onClick: () => void;
  isPending: boolean;
}

const ModalDelete: FC<ModalDeleteProps> = ({ onClick, isPending }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button
          className="group relative transition-all duration-300 hover:border-red-200 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          variant="outline"
          size="icon"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-gray-50/80">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            </div>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-center text-xl font-semibold leading-6 text-gray-900">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-500">
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <AlertDialogCancel className="mt-0 w-full border-gray-200 hover:bg-gray-50 hover:text-gray-700 sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-600 sm:w-auto"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete Account"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDelete;
