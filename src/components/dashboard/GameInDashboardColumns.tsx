"use client";

import { Game } from "@/types/game";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { addKeyToGame } from "@/api/games";
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
      const handleAddKeyToGame = (id: string) => {
        addKeyToGame(id);
      };
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
              <DropdownMenuItem>Delete (not active)</DropdownMenuItem>
              <DropdownMenuItem>Activate</DropdownMenuItem>
              <DropdownMenuItem>Deactivate</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
