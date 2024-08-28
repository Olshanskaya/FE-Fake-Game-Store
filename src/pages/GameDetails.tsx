import { getGameById } from "@/api/games";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { addGameToCart } from "@/api/order";

export function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAddGameToCart = (id: string) => {
    addGameToCart(id);
  };

  if (!id) return <p>Invalid Game ID</p>;

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id?.toString()],
    queryFn: () => getGameById(id)
  });

  if (isLoading) return <p>Loading...</p>;

  console.log("game", game);

  return (
    <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[600px] p-8">
      <div className="max-w-2xl p-20">
        <Carousel>
          <CarouselContent className="flex items-center h-full">
            {game?.data?.images?.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center items-center h-full">
                <img src={image} alt={game?.data?.thumbnail} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{game?.data?.name}</h2>

        <div className="mt-2 text-gray-600">
          <p>{game?.data?.description}</p>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-gray-700 font-semibold">Developer:</span>
          <span className="ml-2 text-gray-600">{game?.data?.developer}</span>
        </div>

        {game?.data?.releaseDate && (
          <div className="mt-4 flex items-center">
            <span className="text-gray-700 font-semibold">Release Date:</span>
            <span className="ml-2 text-gray-600">{game.data.releaseDate.toString()}</span>
          </div>
        )}

        <div className="mt-4 flex items-center">
          <span className="text-gray-700 font-semibold">System Requirements:</span>
          <span className="ml-2 text-gray-600">{game?.data?.systemRequirements}</span>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-gray-700 font-semibold">Supported Players:</span>
          <span className="ml-2 text-gray-600">{game?.data?.playerSupport.join(", ")}</span>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-gray-700 font-semibold">Genres:</span>
          <span className="ml-2 text-gray-600">{game?.data?.genreList.join(", ")}</span>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-gray-700 font-semibold">Price:</span>
          <span className="ml-2 text-gray-600">${game?.data?.price.toFixed(2)}</span>
        </div>

        <Button
          className="mt-6 w-full py-2 px-4 rounded-lg transition duration-300"
          onClick={handleAddGameToCart(id)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
