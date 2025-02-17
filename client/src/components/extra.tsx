// "use client";

// import { useEffect, useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useTasks } from "@/context/task-provider";
// import { toast } from "@/hooks/use-toast";
// import { taskSchema } from "@/lib/validation";

// export default function CreateTask(props: {
//   isDialogOpen: boolean;
//   setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   task?: z.infer<typeof taskSchema>;
//   mode?: "create" | "edit";
// }) {
//   const { isDialogOpen, setIsDialogOpen, mode = "create", task } = props;
//   const { C, updateTask } = useTasks();

//   const form = useForm<z.infer<typeof taskSchema>>({
//     resolver: zodResolver(taskSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       dueDate: new Date(),
//       status: "pending",
//       completed: false,
//     },
//   });

//   // Pre-fill the form if in edit mode
//   useEffect(() => {
//     if (mode === "edit" && task) {
//       form.reset(task);
//     }
//   }, [mode, task, form]);

//   const onSubmit = (values: z.infer<typeof taskSchema>) => {
//     if (mode === "edit") {
//       updateTask.mutate(values);
//     } else {
//       createTask.mutate(values);
//     }
//   };

//   return (
//     <div>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {mode === "edit" ? "Edit Task" : "Create New Task"}
//             </DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <div className="mb-4">
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm dark:text-[#f1f7feb5]">
//                         Title
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="Input Task Title" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="mb-4">
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm dark:text-[#f1f7feb5]">
//                         Description
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Input Task Description"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className="mb-4">
//                 <FormField
//                   control={form.control}
//                   name="dueDate"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm dark:text-[#f1f7feb5]">
//                         Due Date
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="date"
//                           placeholder="Input Due date"
//                           value={field.value.toISOString().split("T")[0]} // Convert Date to YYYY-MM-DD
//                           onChange={(e) =>
//                             field.onChange(new Date(e.target.value))
//                           } // Convert string back to Date
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="mb-4">
//                 <FormField
//                   control={form.control}
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm dark:text-[#f1f7feb5]">
//                         Status
//                       </FormLabel>
//                       <FormControl>
//                         <Input placeholder="Input Task Title" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="mb-4">
//                 <FormField
//                   control={form.control}
//                   name="completed"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm dark:text-[#f1f7feb5]">
//                         Completed
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           value={field.value ? "true" : "false"}
//                           onValueChange={(value) =>
//                             field.onChange(value === "true")
//                           }
//                         >
//                           <SelectTrigger className="w-[100px] cursor-pointer rounded-md border bg-[#F9F9F9] p-2">
//                             <SelectValue placeholder="Select" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="false">No</SelectItem>
//                             <SelectItem value="true">Yes</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <Button
//                 className="!bg-blue-500 text-white h-[40px] w-full text-[15px] font-semibold"
//                 disabled={createTask.isLoading || updateTask.isLoading}
//                 type="submit"
//               >
//                 {(createTask.isLoading || updateTask.isLoading) && (
//                   <Loader className="animate-spin" />
//                 )}
//                 {mode === "edit" ? "Update Task" : "Create Task"}
//                 <ArrowRight />
//               </Button>

//               <div className="mb-4 mt-4 flex items-center justify-center">
//                 <div
//                   aria-hidden="true"
//                   className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
//                   data-orientation="horizontal"
//                   role="separator"
//                 ></div>
//               </div>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
