import { useAuth } from "@/auth/AuthProvider";
import { MyFavourites } from "@/components/myAccount/MyFavourites";
import { MyOrders } from "@/components/myAccount/MyOrders";
import { MyReviews } from "@/components/myAccount/MyReviews";
import { UserInfo } from "@/components/myAccount/UserInfo";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import { Loading } from "./Loading";

export function MyAccount() {
  const { user } = useAuth();
  const [option, setOption] = useState("favourites");

  if (!user) return <Loading></Loading>;

  return (
    <ResizablePanelGroup direction="horizontal" className="p-6">
      <ResizablePanel className="flex flex-col space-y-4 p-6">
        <Button variant="ghost" onClick={() => setOption("favourites")}>
          My Favourites
        </Button>
        <Button variant="ghost" onClick={() => setOption("orders")}>
          My Orders
        </Button>
        <Button variant="ghost" onClick={() => setOption("me")}>
          User Info
        </Button>
        <Button variant="ghost" onClick={() => setOption("reviews")}>
          My Reviews
        </Button>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-6">
        {option === "favourites" && <MyFavourites />}
        {option === "orders" && <MyOrders />}
        {option === "reviews" && <MyReviews />}
        {option === "me" && <UserInfo />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
