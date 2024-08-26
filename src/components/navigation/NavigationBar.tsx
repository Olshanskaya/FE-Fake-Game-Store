import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
import { GENRES, PLAYER_SUPPORT } from "@/types/game";
import { useNavigate } from "react-router-dom";

export function NavigationBar() {
  const navigate = useNavigate();

  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const handleNavigationCart = () => {
    navigate(`/cart`);
  };

  const selectActiveGamesByGenre = (genre: string) => {
    console.log(genre);
  };

  const selectActiveGamesByPlayerSupport = (ps: string) => {
    console.log(ps);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button className="text-white font-bold text-lg" onSelect={handleNavigationHome}>
            ALL GAMES
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Genres</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {GENRES.map((g) => (
                <ListItem
                  key={g.genre}
                  title={g.genre}
                  onClick={() => selectActiveGamesByGenre(g.genre)}
                >
                  {g.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Player Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {PLAYER_SUPPORT.map((g) => (
                <ListItem
                  key={g.supportType}
                  title={g.supportType}
                  onClick={() => selectActiveGamesByPlayerSupport(g.supportType)}
                >
                  {g.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default NavigationBar;
