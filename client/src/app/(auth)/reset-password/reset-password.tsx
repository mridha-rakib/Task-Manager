"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Frown, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import tmsLogo from "@/../../public/tms.png";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { resetPasswordMutationFn } from "@/lib/api";

export default function ResetPassword() {
  const router = useRouter();

  const params = useSearchParams();
  const code = params.get("code");
  const exp = Number(params.get("exp"));
  const now = Date.now();

  const isValid = code && exp && exp > now;

  const { mutate, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  const formSchema = z
    .object({
      password: z.string().trim().min(1, {
        message: "Password is required",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Confirm password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!code) {
      router.replace("/forgot-password?email=");
      return;
    }
    const data = {
      password: values.password,
      verificationCode: code,
    };
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        router.replace("/");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="flex h-full min-h-[590px] w-full max-w-full items-center justify-center">
      {isValid ? (
        <div className="h-full w-full rounded-md p-5">
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image src={tmsLogo} alt="logo" height={110} width={110} />
            </Link>
            <span className="text-4xl font-bold text-primary">
              Welcome to TMS
            </span>
          </div>

          <h1 className="mb-1.5 mt-8 text-center text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
            Set up a new password
          </h1>
          <p className="mb-6 text-center text-[15px] font-normal dark:text-[#f1f7feb5] sm:text-left">
            Your password must be different from your previous one.
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-0">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        New password
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-0">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Confirm new password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password again"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isPending}
                className="text-white h-[40px] w-full text-[15px] font-semibold"
              >
                {isPending && <Loader className="animate-spin" />}
                Update password
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-2 rounded-md">
          <div className="size-[48px]">
            <Frown size="48px" className="text-red-500 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef]">
            Invalid or expired reset link
          </h2>
          <p className="mb-2 text-center text-sm font-normal text-muted-foreground dark:text-[#f1f7feb5]">
            You can request a new password reset link
          </p>
          <Link href="/forgot-password?email=">
            <Button className="h-[40px]">
              <ArrowLeft />
              Go to forgot password
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
