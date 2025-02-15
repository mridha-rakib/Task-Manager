"use client";

import Link from "next/link";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { registerMutationFn } from "@/lib/api";
import { formSchema } from "@/lib/validation";

export default function SignUpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values: ", values);
    mutate(values, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (error) => {
        console.log(error);
        let errorMessage = "An unexpected error occurred. Please try again.";

        // if (typeof error === "object" && error !== null) {
        //   // Check if it's an HTTP error with a response
        //   if ("response" in error && error.response) {
        //     errorMessage = error?.response || errorMessage;
        //   } else if ("message" in error) {
        //     // Handle other types of errors (e.g., network errors)
        //     errorMessage = error.message;
        //   }
        // }
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <main className="h-auto min-h-[590px] w-full max-w-full pt-10">
        {!isSubmitted ? (
          <div className="w-full rounded-md p-5">
            <h1 className="mb-1.5 mt-8 text-center text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
              Create a Task Management Account
            </h1>
            <p className="mb-6 text-center text-base font-normal dark:text-[#f1f7feb5] sm:text-left">
              Already have an account?{" "}
              <Link className="text-primary" href="/">
                Sign in
              </Link>
              .
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Rakib Mahmud Mridha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••••••"
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="!bg-blue-500 text-white h-[40px] w-full text-[15px] font-semibold"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending && <Loader className="animate-spin" />}
                  Create account
                  <ArrowRight />
                </Button>
                <div className="mb-4 mt-4 flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                    data-orientation="horizontal"
                    role="separator"
                  ></div>
                  <span className="mx-4 text-xs font-normal dark:text-[#f1f7feb5]">
                    OR
                  </span>
                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                    data-orientation="horizontal"
                    role="separator"
                  ></div>
                </div>
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
              We just sent a verification link to {form.getValues().email}.
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
    </>
  );
}
