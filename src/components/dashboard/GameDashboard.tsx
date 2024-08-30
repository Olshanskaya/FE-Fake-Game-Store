import { getAllGames } from "@/api/games";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { DataTable } from "../DataTable";
import { EditGameDialog } from "./EditGameDialog";
import { GameInDashboardColumns } from "./GameInDashboardColumns";

export function GameDashboard() {
  const [searchParams] = useSearchParams();
  const newGame: Game = {
    id: "",
    name: "",
    developer: "",
    systemRequirements: "",
    description: "",
    genreList: [],
    playerSupport: [],
    thumbnail: "",
    images: [],
    releaseDate: new Date(),
    price: 0,
    sku: "",
    active: false,
    rating: 0,
    quantity: 0
  };

  const { data: gamesListResponse, isLoading } = useQuery({
    queryKey: ["allGamesListResponse", searchParams.toString()],
    queryFn: () => getAllGames(searchParams)
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>GameDashboard</h1>
      <p>Create new game: </p>
      <EditGameDialog game={newGame}></EditGameDialog>
      <DataTable
        columns={GameInDashboardColumns}
        data={gamesListResponse?.data?.allGamesList || []}
      />
    </div>
  );
}
