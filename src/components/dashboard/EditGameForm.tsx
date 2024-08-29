import { Game, UpdateGame } from "@/types/game";

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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  developer: z.string().min(1).max(50),
  systemRequirements: z.string().min(10).max(500),
  description: z.string().min(10).max(500),
  price: z
    .number()
    .min(0)
    .refine((value) => {
      const decimalPart = value.toString().split(".")[1];
      return !decimalPart || decimalPart.length <= 2;
    }, "Price should have at most 2 decimal places")
});

interface EditGameFormProps extends Game {
  onSubmit: () => void;
}

export function EditGameForm({ onSubmit: handleSubmit, ...props }: EditGameFormProps) {
  const [newGame, setNewGame] = useState<UpdateGame>({ ...props });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.name,
      developer: props.developer,
      systemRequirements: props.systemRequirements,
      description: props.description,
      price: props.price
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNewGame({ ...newGame, ...values });
    console.log(newGame);
    handleSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="game name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="developer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>developer</FormLabel>
              <FormControl>
                <Input placeholder="developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="systemRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>systemRequirements</FormLabel>
              <FormControl>
                <Input placeholder="systemRequirements" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>price</FormLabel>
              <FormControl>
                <Input placeholder="price" {...field} />
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
