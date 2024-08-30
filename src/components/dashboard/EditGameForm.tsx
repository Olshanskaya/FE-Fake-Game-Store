import { CreateGame, Game, GENRES, PLAYER_SUPPORT, UpdateGame } from "@/types/game";

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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { createGame, updateGame } from "@/api/games";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  developer: z.string().min(1).max(50),
  systemRequirements: z.string().min(10).max(500),
  description: z.string().min(10).max(500),
  genreList: z.array(z.string().min(1).max(50)),
  playerSupport: z.array(z.string().min(1).max(50)),
  thumbnail: z.string().min(1).max(150),
  images: z.array(z.string().min(1).max(150)),
  releaseDate: z.date(),
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
  const queryClient = useQueryClient();

  const form = useForm<Game>({
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
      images: props.images,
      releaseDate: new Date(props.releaseDate)
    }
  });

  const { fields, append, remove } = useFieldArray<Game>({
    control: form.control,
    name: "images" as never
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (props.id === "") {
      console.log("create new game");
      const newGame: CreateGame = {
        ...values
      } as CreateGame;
      console.log(newGame);
      createGame(newGame);
    } else {
      console.log("update game");
      const newGame: UpdateGame = {
        ...values,
        id: props.id
      } as UpdateGame;
      console.log(newGame);
      updateGame(newGame);
    }
    queryClient.invalidateQueries({ queryKey: ["allGamesListResponse"] });
    window.location.reload();
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

        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release date</FormLabel>
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

        <div className="flex justify-start items-center gap-3 overflow-x-auto">
          {form.getValues().images.map((image, i) => (
            <img className="max-h-40" key={image} src={image} alt={`Preview for ${i + 1} image`} />
          ))}
        </div>
        <FormItem className="flex flex-col">
          <FormLabel>Images</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormControl>
                <Input
                  placeholder={`Image URL #${index + 1}`}
                  {...form.register(`images.${index}`)}
                />
              </FormControl>
              <Button type="button" onClick={() => remove(index)} variant="outline">
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => append("")} variant="outline">
            Add Image
          </Button>
          <FormMessage />
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
