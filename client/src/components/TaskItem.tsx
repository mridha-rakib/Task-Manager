import React, { useState } from "react";

import { motion } from "framer-motion";
import { Edit2, Star, Trash2 } from "lucide-react";

import CreateTask from "@/app/(main)/components/common/CreateTaskDialog";
import DeleteTaskDialog from "@/app/(main)/components/common/DeleteDialog";
import { item } from "@/utils/animations";
import { formatTime } from "@/utils/utilities";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function TaskItem({ task }: any) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <motion.div
      className="border-white flex h-[16rem] flex-col gap-4 rounded-lg border-2 bg-[#f9f9f9] px-4 py-3 shadow-sm"
      variants={item}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
    >
      <div>
        <h4 className="text-2xl font-bold">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-gray-400 text-sm">{formatTime(task.createdAt)}</p>
        <div>
          <div className="text-gray-400 flex items-center gap-3 text-[1.2rem]">
            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <button>
                  <Edit2 />
                </button>
              </DialogTrigger>
              <DialogContent>
                <CreateTask
                  isDialogOpen={isEditDialogOpen}
                  setIsDialogOpen={setIsEditDialogOpen}
                  mode="edit"
                  task={task}
                />
              </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <button>
                  <Trash2 className="text-[#F65314]" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DeleteTaskDialog
                  isDialogOpen={isDeleteDialogOpen}
                  setIsDialogOpen={setIsDeleteDialogOpen}
                  task={task}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
