"use client";

import { activateGame, addKeyToGame, deactivateGame } from "@/api/games";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Game } from "@/types/game";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { EditGameDialog } from "./EditGameDialog";

export const GameInDashboardColumns: ColumnDef<Game>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "developer",
    header: "Developer"
  },
  {
    accessorKey: "active",
    header: "Status"
  },
  {
    id: "actions1",
    enableHiding: false,
    cell: ({ row }) => {
      const game = row.original;
      return (
        <div>
          <EditGameDialog game={game}></EditGameDialog>
        </div>
      );
    }
  },
  {
    id: "actions2",
    enableHiding: false,
    cell: ({ row }) => {
      const game = row.original;
      const queryClient = useQueryClient();

      const mutation1 = useMutation({
        mutationFn: addKeyToGame,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allGamesListResponse"] });
        }
      });

      const mutation2 = useMutation({
        mutationFn: deactivateGame,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allGamesListResponse"] });
        }
      });

      const mutation3 = useMutation({
        mutationFn: activateGame,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allGamesListResponse"] });
        }
      });

      const handleAddKeyToGame = (id: string) => {
        mutation1.mutate(id);
      };

      const handleDeactivateGame = (id: string) => {
        mutation2.mutate(id);
        console.log("Deactivate", id);
      };

      const handleActivateGame = (id: string) => {
        mutation3.mutate(id);
        console.log("Activate", id);
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleAddKeyToGame(game.id)}>
                Add Key To Game
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivateGame(game.id)}>
                Activate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeactivateGame(game.id)}>
                Deactivate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
