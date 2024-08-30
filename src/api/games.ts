import { GlobalResponse } from "@/types";
import api from ".";
import {
  CreateGame,
  Game,
  GamesListResponse,
  KeyResponce,
  SingleGameWithReviews,
  UpdateGame
} from "../types/game";

export const getAllGames = async (
  params?: URLSearchParams
): Promise<GlobalResponse<GamesListResponse>> => {
  try {
    console.log("params", params);
    const res = await api.get("/games/all", { params });
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

export const getGameById = async (id: string): Promise<GlobalResponse<SingleGameWithReviews>> => {
  try {
    const res = await api.get(`/games/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const createGame = async (game: CreateGame) => {
  try {
    const res = await api.post("/games", game);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateGame = async (game: UpdateGame) => {
  try {
    const res = await api.patch("/games", game);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const addKeyToGame = async (id: string): Promise<GlobalResponse<KeyResponce>> => {
  try {
    const res = await api.post("/games/keys/" + id);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
