"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { resetUserPassword } from "@/api/auth";

const formSchema = z
  .object({
    confirmPassword: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match"
  });

export function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) return <p>Invalid token</p>;

  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    resetUserPassword({ password: values.password, confirmPassword: values.confirmPassword }, token ?? "");
    handleNavigationHome();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirmPassword</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="confirmPassword..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded py-2">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
