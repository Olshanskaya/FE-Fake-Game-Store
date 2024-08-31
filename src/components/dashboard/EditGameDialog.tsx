import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Game } from "@/types/game";
import { useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { EditGameForm } from "./EditGameForm";

export function EditGameDialog({ game }: { game: Game }) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button className="w-8 h-8">
          <LuFileEdit className="w-8 h-8" />
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} style={{ maxWidth: "60vw" }}>
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
