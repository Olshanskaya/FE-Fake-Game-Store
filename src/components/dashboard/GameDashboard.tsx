import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../DataTable";
import { GameInDashboardColumns } from "./GameInDashboardColumns";
import { useSearchParams } from "react-router-dom";
import { getAllGames } from "@/api/games";

export function GameDashboard() {
  const [searchParams] = useSearchParams();

  const { data: gamesListResponse, isLoading } = useQuery({
    queryKey: ["allGamesListResponse", searchParams.toString()],
    queryFn: () => getAllGames(searchParams)
  });

  if (isLoading) return <div>Loading...</div>;
  

  return (
    <div>
      <h1>GameDashboard</h1>
      <DataTable columns={GameInDashboardColumns} data={gamesListResponse?.data?.allGamesList || []} />
    </div>
  );
}
