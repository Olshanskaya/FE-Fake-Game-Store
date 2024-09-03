import { GlobalResponse } from "@/types";
import api from ".";
import { CreateUser, LoggedInUser, LoginUserUser, User } from "@/types/user";

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

export const signup = async (data: CreateUser): Promise<GlobalResponse<LoggedInUser>> => {
  try {
    console.log("data", data);
    const res = await api.post("auth/signup", data);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const verifyEmail = async (token: string): Promise<GlobalResponse<LoggedInUser>> => {
  try {
    const res = await api.post("auth/verify/" + token);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const findLoggedUser = async (): Promise<GlobalResponse<User>> => {
  try {
    const res = await api.get("users/me");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
