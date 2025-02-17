"use client";

import { redirect } from "next/navigation";

import { useAuthContext } from "@/context/auth-provider";
import { AuthProvider } from "@/context/auth-provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-auto w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto h-auto w-full max-w-[450px]">{children}</div>
      </div>
    </div>
  );
}
