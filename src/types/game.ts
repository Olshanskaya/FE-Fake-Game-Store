import { EmbeddedReview, Review } from "./review";

export const GENRES: { genre: string; description: string }[] = [
  { genre: "ACTION", description: "Games that emphasize physical challenges, requiring quick reflexes and coordination." },
  { genre: "ADVENTURE", description: "Games that focus on story-driven exploration and puzzle-solving, often involving immersive narratives." },
  { genre: "FIGHTING", description: "Games where players engage in close combat against other characters, using a variety of attacks and defense moves." },
  { genre: "PLATFORM", description: "Games that involve navigating characters through levels by running, jumping, and climbing, often with obstacles." },
  { genre: "PUZZLE", description: "Games that challenge players with logic, strategy, and problem-solving, requiring the completion of puzzles to progress." },
  { genre: "RACING", description: "Games that simulate competitive racing, where players control vehicles and aim to be the fastest to reach the finish line." },
  { genre: "RPG", description: "Role-playing games where players assume the roles of characters in a fictional world, focusing on character development and story." },
  { genre: "SHOOTER", description: "Games that involve using ranged weapons, typically firearms, to take down enemies, often with fast-paced action." },
  { genre: "SIMULATION", description: "Games that simulate real-world activities or systems, focusing on accuracy and realism." },
  { genre: "SPORTS", description: "Games that emulate real-world sports, where players can compete in various athletic activities." },
  { genre: "STRATEGY", description: "Games that require careful planning and tactical thinking, where players must manage resources and make strategic decisions." },
];

export const PLAYER_SUPPORT: { supportType: string; description: string }[] = [
  { supportType: "COOPERATIVE", description: "Games where players work together towards a common goal, often sharing resources and strategies." },
  { supportType: "LAN", description: "Games that allow players to connect and play together over a local area network, typically in the same physical location." },
  { supportType: "LOCAL_AND_PARTY", description: "Games designed for multiple players on the same device or in the same room, often with a focus on social interaction and party-style gameplay." },
  { supportType: "MMO", description: "Massively multiplayer online games where a large number of players interact within a persistent online world." },
  { supportType: "MULTIPLAYER", description: "Games that support multiple players, either competitively or cooperatively, in the same game session." },
  { supportType: "ONLINE_COMPETITIVE", description: "Games that feature online competitive play, where players compete against others over the internet, often with ranked systems." },
  { supportType: "SINGLE_PLAYER", description: "Games designed to be played by one person, focusing on solo experiences and narratives." },
];

export type Game = {
  id: string;
  name: string;
  genreList: string[];
  quantity: number;
  thumbnail: string;
  images: string[];
  developer: string;
  releaseDate: Date;
  systemRequirements: string;
  playerSupport: string[];
  price: number;
  description: string;
  sku: string;
  active: boolean;
  rating: number;
};

export type CreateGame = {
  name: string;
  genreList: string[];
  thumbnail: string;
  images: string[];
  developer: string;
  releaseDate: Date;
  systemRequirements: string;
  playerSupport: string[];
  price: number;
  description: string;
};

export type GamesListHeader = {
  totalGamesCount: number;
  totalPages: number;
  gamesPerPage: number;
  currentPageNumber: number;
};

export type GamesListResponse = {
  allGamesHead: GamesListHeader;
  allGamesList: Game[];
};

export type SingleGameWithReviews = {
  id: string;
  name: string;
  genreList: string[];
  quantity: number;
  thumbnail: string;
  images: string[];
  developer: string;
  releaseDate: Date;
  systemRequirements: string;
  playerSupport: string[];
  price: number;
  description: string;
  sku: string;
  isActive: boolean;
  averageRating: number;
  reviews: EmbeddedReview[];
};

export type UpdateGame = {
  id: string;
  name: string;
  genreList: string[];
  thumbnail: string;
  images: string[];
  developer: string;
  releaseDate: Date;
  systemRequirements: string;
  playerSupport: string[];
  price: number;
  description: string;
};

export type KeyResponce = {
  gameId: string;
};
