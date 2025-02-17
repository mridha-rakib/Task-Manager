import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

import { Loader } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTasks } from "@/context/task-provider";
import { taskSchema } from "@/lib/validation";

const DeleteTaskDialog = (props: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: z.infer<typeof taskSchema>;
}) => {
  const { isDialogOpen, setIsDialogOpen, task } = props;

  const { deleteTask } = useTasks();

  const router = useRouter();

  const handleDelete = useCallback(() => {
    if (task?._id) {
      deleteTask.mutate(task._id);
      setIsDialogOpen(false);
      router.replace("/home");
    } else {
      console.error("Task ID is undefined");
    }
  }, [task, deleteTask, setIsDialogOpen, router]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log delete?</DialogTitle>
            <DialogDescription>
              This will end your current task.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={deleteTask.isPending}
              type="button"
              className="!text-white"
              onClick={handleDelete}
            >
              {deleteTask.isPending && <Loader className="animate-spin" />}
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteTaskDialog;
