import { GlobalResponse } from "@/types";
import api from ".";
import {
  CreateUser,
  ForgotPassword,
  LoggedInUser,
  LoginUserUser,
  ResetPassword,
  User
} from "@/types/user";
import toast from "react-hot-toast";

export const logIn = async (data: LoginUserUser): Promise<GlobalResponse<LoggedInUser>> => {
  try {
    console.log("data", data);
    const res = await api.post("auth/login", data);
    if (res.data.status === "success") toast.success("Welcome!");
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
    if (res.data.status === "success") toast.success("Check your email for verification link");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const verifyEmail = async (token: string): Promise<GlobalResponse<LoggedInUser>> => {
  try {
    const res = await api.post("auth/verify/" + token);
    if (res.data.status === "success") toast.success("Your Email has been verified");
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

export const forgotUserPassword = async (data: ForgotPassword): Promise<GlobalResponse<void>> => {
  try {
    const res = await api.post("auth/forgot-password", data);
    toast.success("Check you email for password reset link");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const resetUserPassword = async (
  data: ResetPassword,
  token: string
): Promise<GlobalResponse<void>> => {
  try {
    const res = await api.patch("auth/reset-password/" + token, data);
    toast.success("Password reset successfully. Go to Home Page and login");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
