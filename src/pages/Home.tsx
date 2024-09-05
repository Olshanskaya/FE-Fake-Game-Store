import { getAllActiveGames } from "@/api/games";
import { addGameToCart } from "@/api/order";
import { addGameToFav } from "@/api/user";
import { Can } from "@/components/Can";
import { HeroSectionGames } from "@/components/HeroSectionGames";
import PaginationControls from "@/components/PaginationControls";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "./Loading";

export function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleAddGameToCart = (id: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addGameToCart(id);
  };

  const { data: games, isLoading } = useQuery({
    queryKey: ["games", searchParams.toString()],
    queryFn: () => getAllActiveGames(searchParams)
  });

  const handleNavigation = (id: string) => {
    navigate(`/game/${id}`);
  };

  const handleAddGameToFavorite = (id: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    addGameToFav(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  
  return (
    <div className="p-10">
      <div className="max-w-7xl mx-auto">
        <HeroSectionGames></HeroSectionGames>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 p-8">
        {isLoading && <p>Loading...</p>}
        {games?.data?.allGamesList.map((game) => (
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
      <div className="grid justify-center p-10">
        {games?.data?.allGamesHead && (
          <PaginationControls
            hasNextPage={
              games.data.allGamesHead.currentPageNumber < games.data.allGamesHead.totalPages
            }
            hasPrevPage={games.data.allGamesHead.currentPageNumber > 1}
            allGamesHead={games.data.allGamesHead}
          />
        )}
      </div>
    </div>
  );
}
