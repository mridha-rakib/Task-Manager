"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { verifyEmailMutationFn } from "@/lib/api";

export default function ConfirmAccount() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmailMutationFn,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Error",
        description: "Confirmation token not found",
        variant: "destructive",
      });
      return;
    }
    mutate(
      { code },

      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Account confirmed successfully",
          });
          router.replace("/");
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <main className="flex h-full min-h-[590px] w-full max-w-full items-center justify-center">
      <div className="h-full w-full rounded-md p-5">
        "Logo"
        <h1 className="mb-4 mt-8 text-center text-xl font-bold tracking-[-0.16px] dark:text-[#fcfdffef] sm:text-left">
          Account confirmation
        </h1>
        <p className="mb-6 text-center text-[15px] font-normal dark:text-[#f1f7feb5] sm:text-left">
          To confirm your account, please follow the button below.
        </p>
        <form onSubmit={handleSubmit}>
          <Button
            disabled={isPending}
            type="submit"
            className="text-white h-[40px] w-full text-[15px] font-semibold"
          >
            {isPending && <Loader className="animate-spin" />}
            Confirm account
          </Button>
        </form>
        <p className="mt-6 text-sm font-normal text-muted-foreground dark:text-[#f1f7feb5]">
          If you have any issue confirming your account please, contact
          <a
            className="text-primary outline-none transition duration-150 ease-in-out hover:underline focus-visible:ring-2 focus-visible:ring-primary"
            href="#"
          >
            rakibmahmudmridha@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
