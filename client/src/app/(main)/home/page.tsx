"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

import TaskItem from "@/components/TaskItem";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useTasks } from "@/context/task-provider";
import { container, item } from "@/utils/animations";

import CreateTask from "../components/common/CreateTaskDialog";

export default function Home() {
  const { tasks, openModalForAdd } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
      </div>

      <motion.div
        className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {tasks?.map((task, i) => <TaskItem key={i} task={task} />)}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.button
              className="h-[16rem] w-full rounded-md border-2 border-dashed py-2 text-lg font-medium transition duration-200 ease-in-out hover:border-none"
              style={{
                color: "var(--muted-foreground)",
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
              onClick={openModalForAdd}
              variants={item}
              whileHover={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Add New Task
            </motion.button>
          </DialogTrigger>
          <CreateTask
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Dialog>
      </motion.div>
    </main>
  );
}
