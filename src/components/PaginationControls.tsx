import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { GamesListHeader } from "@/types/game";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  allGamesHead: GamesListHeader;
}

export function PaginationControls({
  hasNextPage,
  hasPrevPage,
  allGamesHead
}: PaginationControlsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handlePrev() {
    console.log("prev page");
    searchParams.set("page", `${allGamesHead.currentPageNumber - 1}`);
    setSearchParams(searchParams);
  }

  function handleNext() {
    console.log("next page");
    searchParams.set("page", `${allGamesHead.currentPageNumber + 1}`);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2">
      <Button disabled={!hasPrevPage} onClick={handlePrev}>
        prev page
      </Button>

      <div>{allGamesHead.currentPageNumber}</div>

      <Button disabled={!hasNextPage} onClick={handleNext}>
        next page
      </Button>
    </div>
  );
}

export default PaginationControls;
