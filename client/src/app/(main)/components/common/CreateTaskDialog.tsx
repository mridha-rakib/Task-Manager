"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/context/auth-provider";
import { useTasks } from "@/context/task-provider";
import { taskSchema } from "@/lib/validation";

export default function CreateTask(props: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: z.infer<typeof taskSchema>;
  mode?: "create" | "edit";
}) {
  const { user } = useAuthContext();

  const { isDialogOpen, setIsDialogOpen, mode = "create", task } = props;
  const { createTask, updateTask } = useTasks();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      status: "pending",
      completed: false,
      user: user?._id,
    },
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      form.reset(task);
    }
  }, [mode, task, form]);

  const onSubmit = (values: z.infer<typeof taskSchema>) => {
    if (mode === "edit") {
      updateTask.mutate(values);
    } else {
      createTask.mutate(values);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Input Task Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input Task Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Due Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Input Due Date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[100px] cursor-pointer rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#2d2d2d] dark:text-[#f1f7feb5]">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#2d2d2d] dark:text-[#f1f7feb5]">
                            <SelectItem
                              value="pending"
                              className="dark:hover:bg-[#3d3d3d]"
                            >
                              Pending
                            </SelectItem>
                            <SelectItem
                              value="complete"
                              className="dark:hover:bg-[#3d3d3d]"
                            >
                              Complete
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Completed
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? "true" : "false"}
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                        >
                          <SelectTrigger className="w-[100px] cursor-pointer rounded-md border bg-[#F9F9F9] p-2 dark:bg-[#2d2d2d] dark:text-[#f1f7feb5]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#2d2d2d] dark:text-[#f1f7feb5]">
                            <SelectItem
                              value="false"
                              className="dark:hover:bg-[#3d3d3d]"
                            >
                              No
                            </SelectItem>
                            <SelectItem
                              value="true"
                              className="dark:hover:bg-[#3d3d3d]"
                            >
                              Yes
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="!bg-blue-500 text-white h-[40px] w-full text-[15px] font-semibold"
                disabled={createTask.isPending || updateTask.isPending}
                type="submit"
              >
                {(createTask.isPending || updateTask.isPending) && (
                  <Loader className="animate-spin" />
                )}
                {mode === "edit" ? "Update Task" : "Create Task"}
                <ArrowRight />
              </Button>

              <div className="mb-4 mt-4 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
