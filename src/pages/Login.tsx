"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

const formSchema = z.object({
  email: z.string().email({ message: "Enter correct email" }).min(2).max(50),
  password: z.string().min(2).max(50)
});

export function Login() {
  const navigate = useNavigate();
  const { user, logInUser } = useAuth();

  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const handleNavigationForgotPassword = () => {
    navigate(`/forgot-password`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    logInUser(values.email, values.password);
    console.log(user);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded py-2">
              Submit
            </Button>
            <Button type="button" onClick={handleNavigationHome} className="w-full rounded py-2">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleNavigationForgotPassword}
              className="w-full rounded py-2"
            >
              Forgot password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
