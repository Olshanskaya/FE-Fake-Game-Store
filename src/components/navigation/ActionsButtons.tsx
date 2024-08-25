import { Button } from "@/components/ui/Button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionsButtons = () => {
  const navigate = useNavigate();

  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const handleNavigationCart = () => {
    navigate(`/cart`);
  };

  const handleNavigationLogin = () => {
    navigate(`/login`);
  };

  const handleNavigationRegister = () => {
    navigate(`/register`);
  };

  const handleNavigationDashboard = () => {
    navigate(`/dashboard`);
  };
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify color="white" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                  <Button variant="link" onClick={handleNavigationHome}>
                    Games
                  </Button>
                  <Button variant="link" onClick={handleNavigationDashboard}>
                    Dashboard
                  </Button>
                  <Button variant="link" onClick={handleNavigationCart}>
                    Cart
                  </Button>
                  <Button variant="link" onClick={handleNavigationLogin}>
                    Login
                  </Button>
                  <Button variant="link" onClick={handleNavigationRegister}>
                    Register
                  </Button>
                  <Button variant="link">Log Out</Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ActionsButtons;
