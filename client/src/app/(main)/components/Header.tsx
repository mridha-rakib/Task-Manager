"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";

import CreateTask from "./common/CreateTaskDialog";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex h-[100px] items-center justify-between border-b border-[#00002f26] px-2">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="mr-10 flex h-[50px] items-center gap-10">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="!bg-blue-500 text-white h-[40px] text-[15px] font-semibold">
                Add Task
              </Button>
            </DialogTrigger>
            <CreateTask
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
