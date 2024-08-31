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
      const handleAddKeyToGame = (id: string) => {
        addKeyToGame(id);
      };

      const handleDeactivateGame = (id: string) => {
        deactivateGame(id);
        console.log("Deactivate", id);
      };

      const handleActivateGame = (id: string) => {
        activateGame(id);
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
