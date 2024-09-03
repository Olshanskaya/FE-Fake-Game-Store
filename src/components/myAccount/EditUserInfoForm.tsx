("use client");

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { updateUserInfo } from "@/api/user";
import { useAuth } from "@/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { UpdateUser, User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  address: z.string().min(5).max(500),
  phone: z.string().min(5).max(50),
  birthDate: z.date()
});

interface Props {
  onSubmit: () => void;
}

export function EditUserInfoForm({ onSubmit: handleSubmit }: Props) {
  const { user, updateUserInfoInStorage } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      updateUserInfoInStorage();
    }
  });

  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      address: user?.address || "",
      phone: user?.phone,
      birthDate: new Date(user?.birthDate || "")
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const newUser: UpdateUser = {
      ...values,
      email: user?.email || ""
    } as UpdateUser;
    mutation.mutate(newUser);
    handleSubmit();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 overflow-y-auto max-h-full p-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>birthDate</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                  value={
                    field.value instanceof Date
                      ? `${field.value.getFullYear()}-${String(field.value.getMonth() + 1).padStart(
                          2,
                          "0"
                        )}-${String(field.value.getDate()).padStart(2, "0")}`
                      : field.value || ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone</FormLabel>
              <FormControl>
                <Input placeholder="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
