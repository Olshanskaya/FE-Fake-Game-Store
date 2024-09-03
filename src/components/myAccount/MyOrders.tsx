import { useAuth } from "@/auth/AuthProvider";

export function MyOrders() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
}
