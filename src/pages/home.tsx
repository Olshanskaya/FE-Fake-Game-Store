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
import { Game, GamesListResponse } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveGames } from "@/api/games";
import { GlobalResponse, GlobalResponseStatus } from "@/types";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleFetchGames = async () => {
    const responce: GlobalResponse<GamesListResponse> = await getAllActiveGames();
    if (responce.status === GlobalResponseStatus.ERROR || !responce.data) return [];
    return responce.data.allGamesList;
  };

  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: handleFetchGames
  });

  const handleNavigation = (id: string) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="p-2">
      <div className="grid grid-cols-3 gap-10">
        {isLoading && <p>Loading...</p>}
        {games?.map((game) => (
          <Card key={game.id} onClick={() => handleNavigation(game.id)}>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Price: {game.price}</p>
              <p>Rating: {game.rating}</p>
              <img
                src={game.thumbnail}
                alt="https://res.cloudinary.com/df5iprard/image/upload/c_thumb,w_200,g_face/v1723707873/2024-08-15_104400_j19p5p.png"
              />
            </CardContent>
            <CardFooter>
              <Can
                permission="ORDER:ADD_GAME"
                permissionType="actions"
                yes={() => <Button>Add To Cart</Button>}
                no={() => <p>Sign in to access your shopping cart</p>}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
