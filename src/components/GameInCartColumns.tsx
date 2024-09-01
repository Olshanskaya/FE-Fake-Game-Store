import { addGameToCart, deleteGameFromCart } from "@/api/order";
import { GameOrder } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";

export const GameInCartColumns: ColumnDef<GameOrder>[] = [
  {
    accessorKey: "game.name",
    header: "Name"
  },
  {
    accessorKey: "game.price",
    header: "Price"
  },
  {
    id: "action1",
    enableHiding: false,
    cell: ({ row }) => {
      const game = row.original;
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: deleteGameFromCart,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      });

      const handleDeleteGameInCart = (id: string) => {
        mutation.mutate(id);
      };

      return (
        <div>
          <Button onClick={() => handleDeleteGameInCart(game.game.id)}>-</Button>
        </div>
      );
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    id: "action2",
    enableHiding: false,
    cell: ({ row }) => {
      const game = row.original;
      const queryClient = useQueryClient();

      const mutation = useMutation({
        mutationFn: addGameToCart,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      });

      const handleAddGameInCart = (id: string) => {
        mutation.mutate(id);
      };
      return (
        <div>
          <Button onClick={() => handleAddGameInCart(game.game.id)}>+</Button>
        </div>
      );
    }
  }
];
