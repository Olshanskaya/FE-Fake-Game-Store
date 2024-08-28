import { GlobalResponse } from "@/types";
import api from ".";
import { Order, Pay } from "@/types/order";

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
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const checkoutOrder = async (): Promise<GlobalResponse<Order>> => {
  try {
    const res = await api.post("users/me/orders/current/checkout");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const payForOrder = async (data: Pay): Promise<GlobalResponse<Order>> => {
  try {
    const res = await api.post("users/me/orders/current/pay", data);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
