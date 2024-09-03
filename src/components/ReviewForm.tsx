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

import { Rating, ThinStar } from "@smastrom/react-rating";

import { createReview } from "@/api/review";
import { Input } from "@/components/ui/input";
import { CreateOrUpdateReview } from "@/types/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().max(2000),
  starRating: z.number().int().min(1).max(5)
});

interface Props {
  onSubmit: () => void;
  gameId: string;
}

export function ReviewForm({ onSubmit: handleSubmit, gameId }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
    }    
  });

  const form = useForm<CreateOrUpdateReview>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      starRating: 0
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const review: CreateOrUpdateReview = {
      ...values,
      gameId: gameId
    } as CreateOrUpdateReview;
    mutation.mutate({ id: gameId, data: review });
    handleSubmit();
  }

  const customStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#780206",
    inactiveFillColor: "#d3d3d3"
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 overflow-y-auto max-h-full p-10"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="starRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Star Rating</FormLabel>
              <FormControl>
                <Rating
                  style={{ maxWidth: 250 }}
                  value={field.value}
                  onChange={field.onChange}
                  itemStyles={customStyles}
                />
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
