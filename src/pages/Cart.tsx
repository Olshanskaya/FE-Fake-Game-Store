import { getCartOfCurrrentUser } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

export function Cart() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartOfCurrrentUser()
  });

  console.log("cart", cart);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cart</h1>
      <p>{cart?.data?.id}</p>
      <p>{cart?.data?.totalPrice}</p>
      


    </div>
  );
}
