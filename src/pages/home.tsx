import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveGames } from "@/api/games";

export function Home() {
  const handleFetchGames = async () => {
    try {
      const games = await getAllActiveGames();
      return games.data.allGamesList;
    } catch (error) {
      throw new Error("Failed to fetch games");
    }
  };

  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: handleFetchGames
  });

  return (
    <div className="p-2">
      <div className="grid grid-cols-3 gap-10">
        {isLoading && <p>Loading...</p>}
        {games?.map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
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
