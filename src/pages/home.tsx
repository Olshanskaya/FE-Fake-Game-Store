import { getAllActiveGames } from "@/api/games";
import { addGameToCart } from "@/api/order";
import { Can } from "@/components/Can";
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
import { useNavigate, useSearchParams } from "react-router-dom";

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

  return (
    <div className="p-2">
      <div className="grid grid-cols-3 gap-10 p-8">
        {isLoading && <p>Loading...</p>}
        {games?.data?.allGamesList.map((game) => (
          <Card key={game.id} onClick={() => handleNavigation(game.id)}>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
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
                  <Button onClick={(event) => handleAddGameToCart(game.id, event)}>
                    Add To Cart
                  </Button>
                )}
                no={() => <p>Sign in to access your shopping cart</p>}
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
