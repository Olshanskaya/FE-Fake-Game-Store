import { GameOrder } from "@/types/order"
import { ColumnDef } from "@tanstack/react-table"

export const GameInCartColumns: ColumnDef<GameOrder>[] = [
    {
      accessorKey: "game.name",
      header: "Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "game.price",
      header: "Price",
    },
  ]