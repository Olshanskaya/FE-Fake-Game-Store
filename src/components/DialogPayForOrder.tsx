import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function DialogPayForOrder() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    console.log("checkout");
    // checkoutOrder();
  };

  const handlePay = (value: boolean) => {
    console.log(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleCheckout}>Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay for Order</DialogTitle>
          <DialogDescription>Enter the card number for payment.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="link" defaultValue="1111 1111 1111 1111" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => handlePay(false)}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={() => handlePay(true)}>
              Pay
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
