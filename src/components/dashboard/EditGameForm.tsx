import { Game, GENRES, PLAYER_SUPPORT, UpdateGame } from "@/types/game";

("use client");
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/ui/MultiSelector";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import api from "@/api";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  developer: z.string().min(1).max(50),
  systemRequirements: z.string().min(10).max(500),
  description: z.string().min(10).max(500),
  genreList: z.array(z.string().min(1).max(50)),
  playerSupport: z.array(z.string().min(1).max(50)),
  thumbnail: z.string().min(1).max(150),
  images: z.array(z.string().min(1).max(150)),
  // releaseDate: z.date(),
  // price: z
  //   .number()
  //   .min(0)
  //   .refine((value) => {
  //     const decimalPart = value.toString().split(".")[1];
  //     return !decimalPart || decimalPart.length <= 2;
  //   }, "Price should have at most 2 decimal places")
  price: z
    .string()
    .min(1, "Price cannot be empty")
    .transform((value) => value.replace(",", "."))
    .refine((value) => !isNaN(parseFloat(value)), "Price must be a valid number")
    .transform((value) => parseFloat(value))
    .refine((value) => value >= 0, "Price cannot be negative")
});

interface EditGameFormProps extends Game {
  onSubmit: () => void;
}

export function EditGameForm({ onSubmit: handleSubmit, ...props }: EditGameFormProps) {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.name,
      developer: props.developer,
      systemRequirements: props.systemRequirements,
      description: props.description,
      price: props.price.toString(),
      genreList: props.genreList,
      playerSupport: props.playerSupport,
      thumbnail: props.thumbnail,
      images: props.images
      // releaseDate: props.releaseDate || new Date()
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values.genreList);
    // console.log(values.playerSupport);
    console.log(values);
    const newGame: UpdateGame = {...values, id: props.id, releaseDate: props.releaseDate} as UpdateGame;
    console.log(newGame);

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="game name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>releaseDate</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
                <Input type="number" placeholder="price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genreList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>genreList</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={(values) => form.setValue("genreList", values)}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select your genreList" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {GENRES.map((genre) => (
                        <MultiSelectorItem key={genre.genre} value={genre.genre}>
                          {genre.genre}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="playerSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>playerSupport</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={(values) => form.setValue("playerSupport", values)}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select playerSupport" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {PLAYER_SUPPORT.map((ps) => (
                        <MultiSelectorItem key={ps.supportType} value={ps.supportType}>
                          {ps.supportType}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>thumbnail</FormLabel>
              <FormControl>
                <Input placeholder="thumbnail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>images</FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
