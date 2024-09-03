import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { SingleGameWithReviews } from "@/types/game";
import { useState } from "react";
import { ReviewForm } from "./ReviewForm";
import { Button } from "./ui/button";


export function ReviewDialog({ game }: { game: SingleGameWithReviews }) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button className="w-full">Add Review</Button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} style={{ maxWidth: "60vw" }}>
        <SheetHeader>
          <SheetTitle>Your Review</SheetTitle>
        </SheetHeader>
        <SheetClose asChild>
          <ReviewForm onSubmit={closeSheet} gameId={game.id} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
