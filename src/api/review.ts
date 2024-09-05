import { GlobalResponse } from "@/types";
import { CreateOrUpdateReview, Review } from "@/types/review";
import api from ".";
import toast from "react-hot-toast";

export const createReview = async ({
  id,
  data
}: {
  id: string;
  data: CreateOrUpdateReview;
}): Promise<GlobalResponse<Review>> => {
  try {
    const res = await api.post("games/reviews/" + id, data);
    if (res.data.status === "success") toast.success("Thant you for your review!");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateReview = async ({
  id,
  data
}: {
  id: string;
  data: CreateOrUpdateReview;
}): Promise<GlobalResponse<Review>> => {
  try {
    const res = await api.patch("games/reviews/" + id, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
