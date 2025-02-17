"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import tmsLogo from "@/../../public/tms.png";
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
import { forgotPasswordMutationFn } from "@/lib/api";

export default function ForgotPassword() {
  const params = useSearchParams();

  const email = params.get("email");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email().min(1, {
      message: "Email is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (response: any) => {
        setIsSubmitted(true);
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
      {!isSubmitted ? (
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
            Reset password
          </h1>
          <p className="mb-6 text-center text-base font-normal dark:text-[#f1f7feb5] sm:text-left">
            Include the email address associated with your account and we’ll
            send you an email with instructions to reset your password.
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-0">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="subscribeto@channel.com"
                          autoComplete="off"
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
                Send reset instructions
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-2 rounded-md">
          <div className="size-[48px]">
            <MailCheckIcon size="48px" className="animate-bounce" />
          </div>
          <h2 className="text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef]">
            Check your email
          </h2>
          <p className="mb-2 text-center text-sm font-normal text-muted-foreground dark:text-[#f1f7feb5]">
            We just sent a password reset link to {form.getValues().email}.
          </p>
          <Link href="/">
            <Button className="h-[40px]">
              Go to login
              <ArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}
