import { getCurrentUsersOrders } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

export function MyOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: () => getCurrentUsersOrders()
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <div className="grid  gap-10 p-8">
        {orders?.data
          ?.filter((order) => !(order.status === "PROCESSING" && order.paymentStatus === "UNPAID"))
          .map((order) => (
            <div
              key={order.id}
              className="bg-card text-card-foreground border border-border rounded-lg shadow-md p-4 mb-4"
            >
              <h2 className="text-xl font-bold text-gradient mb-2">
                Order: status {order.status} {order.paymentStatus}
              </h2>
              <ul className="list-none p-0">
                {order.games.map((game) => (
                  <li
                    key={game.game.id}
                    className="bg-accent text-accent-foreground rounded-md p-2 mb-1 border border-border"
                  >
                    {game.game.name}: {game.quantity} items
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
