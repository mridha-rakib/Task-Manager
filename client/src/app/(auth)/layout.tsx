"use client";

import { redirect } from "next/navigation";

import useAuth from "@/hooks/use-auth";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  if (data) {
    redirect("/home");
  }
  console.log("Layout Data: ", data);
  return (
    <div className="h-auto w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto h-auto w-full max-w-[450px]">{children}</div>
      </div>
    </div>
  );
}
