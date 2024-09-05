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
import { useNavigate } from "react-router-dom";
import { forgotUserPassword } from "@/api/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Enter correct email" }).min(2).max(50)
});

export function ForgotPassword() {
    
  const navigate = useNavigate();
  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgotUserPassword({ email: values.email });
    handleNavigationHome();
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
          <Button type="submit" className="w-full rounded py-2">
            Reset Password
          </Button>
          <Button type="button" onClick={handleNavigationHome} className="w-full rounded py-2">
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  </div>
  );
}
