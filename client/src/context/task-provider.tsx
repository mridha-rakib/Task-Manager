"use client";

import React, { createContext, useEffect, useState } from "react";

import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { toast } from "@/hooks/use-toast";
import {
  createTaskMutationFn,
  getTaskMutationFn,
  getTasksMutationFn,
  updateTaskMutationFn,
} from "@/lib/taskApi";
import type { TaskType } from "@/lib/taskApi";

import { useAuthContext } from "./auth-provider";

type TaskContextType = {
  task: TaskType | null;
  tasks: TaskType[];
  createTask: UseMutationResult<AxiosResponse<any>, Error, TaskType, unknown>;
  updateTask: UseMutationResult<AxiosResponse<any>, Error, TaskType, unknown>;
  getTask: UseMutationResult<AxiosResponse<any>, Error, string, unknown>;
  getTasks: UseMutationResult<AxiosResponse<any>, Error, void, unknown>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  modalMode: string;
  openModalForAdd: () => void;
  openModalForEdit: (task: TaskType) => void;
  closeModal: () => void;
  refetch: () => void;
};

const TasksContext = createContext<TaskContextType | undefined>(undefined);

export const TasksProvider = ({ children }: any) => {
  const { user } = useAuthContext();
  const userId = user?._id;

  const [tasks, setTasks] = useState<any[]>([]);

  const [task, setTask] = useState<TaskType | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [modalMode, setModalMode] = useState("");

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask(null);
  };

  const openModalForEdit = (task: any) => {
    setModalMode("edit");
    setIsEditing(true);
    setTask(null);
  };

  const closeModal = () => {
    setIsEditing(false);
    setModalMode("");
    setTask(null);
  };
  const getTasks = useMutation<AxiosResponse<TaskType[]>, Error, void>({
    mutationFn: getTasksMutationFn,
    onSuccess: (response) => {
      setTasks(response.data);
      toast({
        title: "Success",
        description: "Tasks fetched successfully!",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    },
  });

  const getTask = useMutation<AxiosResponse<TaskType>, Error, string>({
    mutationFn: getTaskMutationFn,
    onSuccess: (response) => {
      setTask(response.data);
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch task",
        variant: "destructive",
      });
    },
  });

  const createTask = useMutation({
    mutationFn: createTaskMutationFn,
    onSuccess: (response) => {
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      toast({
        title: "Success",
        description: "Task created successfully!",
      });
      closeModal();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: updateTaskMutationFn,
    onSuccess: (response) => {
      const updatedTask = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );

      toast({
        title: "Success",
        description: "Task updated successfully!",
      });

      closeModal();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (userId) getTasks.mutate();
  }, [userId]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        task,
        getTask,
        getTasks,
        createTask,
        updateTask,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        closeModal,
        modalMode,
        error: getTasks.error,
        isLoading: getTasks.isPending,
        isFetching: getTasks.isPending,
        refetch: () => getTasks.mutate(),
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = React.useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
