import { GlobalResponse } from "@/types";
import api from ".";
import { Order, Pay } from "@/types/order";
import toast from "react-hot-toast";

export const getCartOfCurrrentUser = async (): Promise<GlobalResponse<Order>> => {
  try {
    const res = await api.get("users/me/orders/current");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const addGameToCart = async (id: string) => {
  try {
    const res = await api.post("users/me/orders/current/game/" + id);
    if (res.data.status === "success") toast.success("Game added to Cart");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteGameFromCart = async (id: string) => {
  try {
    const res = await api.delete("users/me/orders/current/game/" + id);
    if (res.data.status === "success") toast.success("Game removed from Cart");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const checkoutOrder = async (): Promise<GlobalResponse<Order>> => {
  try {
    const res = await api.post("users/me/orders/current/checkout");
    if (res.data.status === "success") toast.success("Order checked out");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const payForOrder = async (data: Pay): Promise<GlobalResponse<Order>> => {
  try {
    toast.success("Processing payment...");
    const res = await api.post("users/me/orders/current/pay", data);
    if (res.data.status === "success") toast.success("Payment successful. Check your email for keys.");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const getCurrentUsersOrders = async (): Promise<GlobalResponse<Order[]>> => {
  try {
    const res = await api.get("users/me/orders");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
