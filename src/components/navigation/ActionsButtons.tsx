import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Can } from "../Can";

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
                  <Can
                    permission="DASHBOARD:ACCESS"
                    permissionType="actions"
                    yes={() => (
                      <Button variant="link" onClick={handleNavigationDashboard}>
                        Dashboard
                      </Button>
                    )}
                  />
                  <Can
                    permission="CART:VIEW"
                    permissionType="views"
                    yes={() => (
                      <Button variant="link" onClick={handleNavigationCart}>
                        Cart
                      </Button>
                    )}
                  />
                  <Can
                    permission="AUTH:VIEW"
                    permissionType="views"
                    yes={() => (
                      <>
                        <Button variant="link" onClick={handleNavigationLogin}>
                          Login
                        </Button>
                        <Button variant="link" onClick={handleNavigationRegister}>
                          SignUp
                        </Button>
                      </>
                    )}
                  />
                  <Can
                    permission="ME:LOGOUT"
                    permissionType="actions"
                    yes={() => <Button variant="link">Log Out</Button>}
                  />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div>
        <div className="hidden md:flex md:space-x-4">
          <Can
            permission="DASHBOARD:ACCESS"
            permissionType="actions"
            yes={() => (
              <Button
                className="text-black text-lg"
                onClick={handleNavigationDashboard}
                variant="secondary"
              >
                Dashboard
              </Button>
            )}
          />
          <Can
            permission="CART:VIEW"
            permissionType="views"
            yes={() => (
              <LuShoppingBag
                color="white"
                onClick={handleNavigationCart}
                style={{ width: "40x", height: "40px" }}
              />
            )}
          />
          <Can
            permission="AUTH:VIEW"
            permissionType="views"
            yes={() => (
              <>
                <Button className="text-md" variant="secondary" onClick={handleNavigationRegister}>
                  SignUp
                </Button>
                <Button className="text-md" variant="secondary" onClick={handleNavigationLogin}>
                  Login
                </Button>
              </>
            )}
          />
          <Can
            permission="ME:LOGOUT"
            permissionType="actions"
            yes={() => (
              <Button className="text-md" variant="secondary">
                Log Out
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionsButtons;
