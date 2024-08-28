import { getCartOfCurrrentUser } from "@/api/order";
import { DataTable } from "@/components/DataTable";
import { DialogPayForOrder } from "@/components/DialogPayForOrder";
import { GameInCartColumns } from "@/components/GameInCartColumns";
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
      {/* <p>{cart?.data?.id}</p> */}
      <div className="container mx-auto py-10">
        <DataTable columns={GameInCartColumns} data={cart?.data?.games ?? []} />
        <p className="py-10">Total Price: {cart?.data?.totalPrice?.toFixed(2) ?? 0}</p>
        <DialogPayForOrder id={cart?.data?.id ?? ""} />
      </div>
    </div>
  );
}
