import { GlobalResponse } from "@/types";
import { UpdateUser, UpdateUserRole, User } from "@/types/user";
import api from ".";
import toast from "react-hot-toast";
import { Game } from "@/types/game";

export const getAllUsers = async (): Promise<GlobalResponse<User[]>> => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateUserRole = async ({
  id,
  data
}: {
  id: string;
  data: UpdateUserRole;
}): Promise<GlobalResponse<User>> => {
  try {
    const res = await api.patch("users/role/" + id, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const addGameToFav = async (id: string): Promise<GlobalResponse<void>> => {
  try {
    const res = await api.post("users/me/games/favourites/" + id);
    if (res.data.status === "success") toast.success("Game in your favorites");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const getAllFavGames = async (): Promise<GlobalResponse<Game[]>> => {
  try {
    const res = await api.get("users/me/games/favourites");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteGameInFav = async (id: string): Promise<GlobalResponse<void>> => {
  try {
    const res = await api.delete("users/me/games/favourites/" + id);
    if (res.data.status === "success") toast.success("Game deleted from your favorites");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateUserInfo = async (data: UpdateUser): Promise<GlobalResponse<User>> => {
  try {
    const res = await api.patch("users/me", data);
    if (res.data.status === "success") toast.success("User updated");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
