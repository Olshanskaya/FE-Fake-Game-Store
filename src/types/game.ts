import { Review } from "./review";

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
  reviews: Review[];
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

export type Key = {
  gameId: string;
};
