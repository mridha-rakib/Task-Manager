"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { link } from "fs";
import { Check, FileCheck, Grid, Timer, Trash } from "lucide-react";

function MiniSidebar() {
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <Grid />,
      title: "All",
      link: "/",
    },
    {
      icon: <FileCheck />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <Check />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <Timer />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  return (
    <div className="flex basis-[5rem] flex-col bg-[#f9f9f9]">
      <div className="flex h-[5rem] items-center justify-center">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="group relative">
              <Link href={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle text-white pointer-events-none absolute left-8 top-[50%] translate-y-[-50%] rounded-md bg-[#3aafae] px-2 py-1 text-xs opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-[1.5rem]">
          <button className="rounded-full flex h-12 w-12 items-center justify-center border-2 border-[#EB4E31] p-2">
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;
