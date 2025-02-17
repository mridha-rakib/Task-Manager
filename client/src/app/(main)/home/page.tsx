"use client";

import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/context/task-provider";
import { toast } from "@/hooks/use-toast";
import { getTasksMutationFn } from "@/lib/taskApi";
import { container, item } from "@/utils/animations";

import CreateTask from "../components/common/CreateTaskDialog";

export default function Home() {
  const { tasks, openModalForAdd } = useTasks();

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

        <motion.button
          className="text-gray-500 border-gray-400 hover:bg-gray-300 h-[16rem] w-full rounded-md border-2 border-dashed py-2 text-lg font-medium transition duration-200 ease-in-out hover:border-none"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
