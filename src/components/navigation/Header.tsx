import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";
import ActionsButtons from "./ActionsButtons";

export function Header() {
  return (
    <div className="flex justify-between items-center px-10 border-y-4 bg-gradient">
      {/* <NavigationMenu>
        <NavigationMenuList> */}
          <Logo />
          <NavigationBar />
          <ActionsButtons />
        {/* </NavigationMenuList>
      </NavigationMenu> */}
    </div>
  );
}
