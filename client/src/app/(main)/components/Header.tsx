import React from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <div className="w-full">
      <div className="h-[100px]flex flex items-center justify-between border-b border-[#00002f26] px-2">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="mr-10 flex h-[50px] items-center gap-[10.4rem]">
          <Button className="rounded-[50px] text-sm transition-all duration-200 ease-in-out hover:bg-foreground hover:text-xl">
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
