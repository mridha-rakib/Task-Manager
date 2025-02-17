import React, { useState } from "react";

import { motion } from "framer-motion";
import { Edit2, Star, Trash2 } from "lucide-react";

import CreateTask from "@/app/(main)/components/common/CreateTaskDialog";;
import { item } from "@/utils/animations";
import { formatTime } from "@/utils/utilities";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

function TaskItem({ task }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
              <button
                className={`${
                  task.completed ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {<Star />}
              </button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>{<Edit2 />}</DialogTrigger>
                <DialogContent>
                  <CreateTask
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    mode="edit"
                    task={task}
                  />
                </DialogContent>
              </Dialog>
              <button className="text-[#F65314]">{<Trash2 />}</button>
            </div>
          </div>
        </div>
      </motion.div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-gray-500 text-sm">
              Created At: {formatTime(task.createdAt)}
            </p>
            <p className="text-gray-500 text-sm">
              Status: {task.completed ? "Completed" : "Incomplete"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
  );
}

export default TaskItem;


  /* <button
  className="text-primary"
  onClick={() => {
    console.log(typeof task._id);
    const taskId = task._id;
    console.log(typeof taskId);
    getTask.mutate(taskId, {
      onSuccess: ({ data }) => {
        console.log("Task Data:", data);
        openModalForEdit(data);
      },
    });
  }}
></button>; */

