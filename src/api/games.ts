import api from ".";
import { CreateGame } from "../types/game";

export const getAllGames = async () => {
  try {
    const res = await api.get("/games");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const getAllActiveGames = async () => {
  try {
    const res = await api.get("/games/active");
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
