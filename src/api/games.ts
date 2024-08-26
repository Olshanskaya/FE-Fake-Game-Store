import { GlobalResponse } from "@/types";
import api from ".";
import { CreateGame, Game, GamesListResponse } from "../types/game";

export const getAllGames = async (params?: URLSearchParams) => {
  try {
    console.log("params", params);
    const res = await api.get("/games", { params });
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const getAllActiveGames = async (
  params?: URLSearchParams
): Promise<GlobalResponse<GamesListResponse>> => {
  try {
    console.log("params", params);
    const res = await api.get("/games/active", { params });
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const createOne = async (game: CreateGame) => {
  try {
    const res = await api.post("/games", game);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const getActiveGamesByGenre = async (game: CreateGame) => {
  try {
    const res = await api.post("/games", game);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
