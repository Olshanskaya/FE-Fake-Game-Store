import { GlobalResponse } from "@/types";
import api from ".";
import { LoggedInUser, LoginUserUser } from "@/types/user";

export const logIn = async (data: LoginUserUser): Promise<GlobalResponse<LoggedInUser>> => {
  try {
    console.log("data", data);
    const res = await api.post("auth/login", data);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
