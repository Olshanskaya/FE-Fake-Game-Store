import { addGameToCart } from "@/api/order";
import { deleteGameInFav, getAllFavGames } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function MyFavourites() {
  const queryClient = useQueryClient();

  const { data: favouritesGames, isLoading } = useQuery({
    queryKey: ["favouritesGames"],
    queryFn: () => getAllFavGames()
  });

  const mutation = useMutation({
    mutationFn: deleteGameInFav,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favouritesGames"] });
    }
  });

  const handleAddGameToCart = (id: string) => {
    addGameToCart(id);
  };

  const handleDeleteGameFromFav = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div>
      <h1>My Favourites</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 p-8">
        {isLoading && <p>Loading...</p>}
        {favouritesGames?.data?.map((game) => (
          <Card key={game.id}>
            <CardHeader className="flex flex-col text-center">
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img
                className="object-cover h-72 w-72 "
                src={game.thumbnail}
                alt="https://res.cloudinary.com/df5iprard/image/upload/c_thumb,w_200,g_face/v1723707873/2024-08-15_104400_j19p5p.png"
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={() => handleAddGameToCart(game.id)}>
                Add To Cart
              </Button>
              <Button className="w-full" onClick={() => handleDeleteGameFromFav(game.id)}>
                Delete from Favourites
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
