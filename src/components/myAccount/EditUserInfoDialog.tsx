import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet";
  import { useState } from "react";
import { Button } from "../ui/button";
import { EditUserInfoForm } from "./EditUserInfoForm";
  
  export function EditGameDialog() {
    const [isSheetOpen, setSheetOpen] = useState(false);
  
    const closeSheet = () => setSheetOpen(false);
  
    return (
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
            <Button className="w-full">Edit</Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} style={{ maxWidth: "60vw" }}>
          <SheetHeader>
            <SheetTitle>Edit Game</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <EditUserInfoForm onSubmit={closeSheet} />
          </SheetClose>
        </SheetContent>
      </Sheet>
    );
  }