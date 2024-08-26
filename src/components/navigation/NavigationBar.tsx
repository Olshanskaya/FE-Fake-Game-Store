import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuSearch } from "react-icons/lu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { GENRES, PLAYER_SUPPORT } from "@/types/game";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function NavigationBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState<string>("");

  const search = searchParams.get("search");
  const genres = searchParams.get("genres");
  const playerSupports = searchParams.get("playerSupports");

  const handleNavigationHome = () => {
    navigate(`/`);
  };

  const handleNavigationCart = () => {
    navigate(`/cart`);
  };

  const handleNavigationDashboard = () => {
    navigate(`/dashboard`);
  };

  const selectActiveGamesByName = (name: string) => {
    searchParams.set("search", name);
    setSearchParams(searchParams);
    console.log(name);
  };

  const selectActiveGamesByGenre = (genre: string) => {
    setSearchParams({genres: genre });
    console.log(genre);
  };

  const selectActiveGamesByPlayerSupport = (ps: string) => {
    setSearchParams({playerSupports: ps });
    console.log(ps);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button className="text-white font-bold text-lg" onClick={handleNavigationHome}>
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
        <NavigationMenuItem className="w-full">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="name"
              placeholder="search by name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <LuSearch
              className="w-8 h-8"
              color="white"
              onClick={() => selectActiveGamesByName(name)}
            />
          </div>
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
