import { getHeroesGames } from "@/api/games";
import { addGameToCart } from "@/api/order";
import { addGameToFav } from "@/api/user";
import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LuHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function HeroSectionGames() {
  const navigate = useNavigate();
  const handleAddGameToCart = (id: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addGameToCart(id);
  };

  const { data: games, isLoading } = useQuery({
    queryKey: ["heroesGames"],
    queryFn: getHeroesGames
  });

  const handleNavigation = (id: string) => {
    navigate(`/game/${id}`);
  };

  const handleAddGameToFavorite = (id: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addGameToFav(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-gradient p-5">
      <h1 className="text-center font-bold text-4xl text-gray-300" >
        BEST GAMES
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 p-10">
        {games?.data?.map((game) => (
          <Card key={game.id} onClick={() => handleNavigation(game.id)}>
            <CardHeader className="flex flex-col text-center">
              <button onClick={(event) => handleAddGameToFavorite(game.id, event)}>
                <LuHeart color="red" />
              </button>
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
            <CardFooter>
              <Can
                permission="ORDER:ADD_GAME"
                permissionType="actions"
                yes={() => (
                  <Button
                    className="w-full"
                    onClick={(event) => handleAddGameToCart(game.id, event)}
                  >
                    Add To Cart
                  </Button>
                )}
                no={() => <p className="w-full flex justify-center items-center text-center">Sign in to access your shopping cart</p>}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
