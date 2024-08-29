import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Game, UpdateGame } from "@/types/game";
import { useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { EditGameForm } from "./EditGameForm";
import { Button } from "../ui/button";

export function EditGameDialog({ game }: { game: Game }) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const openSheet = () => setSheetOpen(true);
  const closeSheet = () => setSheetOpen(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button className="w-8 h-8">
          <LuFileEdit className="w-8 h-8" />
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Edit Game</SheetTitle>
        </SheetHeader>
        <SheetClose asChild>
          <EditGameForm onSubmit={closeSheet} {...game} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
