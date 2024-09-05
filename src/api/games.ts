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
import toast from "react-hot-toast";

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
    params = params ? params : new URLSearchParams();
    params.set("size", "15");
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
    if (res.data.status === "success") toast.success("Game created!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateGame = async (game: UpdateGame) => {
  try {
    const res = await api.patch("/games", game);
    if (res.data.status === "success") toast.success("Game updated!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const addKeyToGame = async (id: string): Promise<GlobalResponse<KeyResponce>> => {
  try {
    const res = await api.post("/games/keys/" + id);
    if (res.data.status === "success") toast.success("Key added to game!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const activateGame = async (id: string): Promise<GlobalResponse<KeyResponce>> => {
  try {
    const res = await api.patch("/games/activation/" + id);
    if (res.data.status === "success") toast.success("Now users can buy this game!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deactivateGame = async (id: string): Promise<GlobalResponse<KeyResponce>> => {
  try {
    const res = await api.patch("/games/deactivation/" + id);
    if (res.data.status === "success") toast.success("Now this game is not available for purchase!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};


export const getHeroesGames = async (): Promise<GlobalResponse<Game[]>> => {
  try {
    const res = await api.get("/games/active/hero");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};




