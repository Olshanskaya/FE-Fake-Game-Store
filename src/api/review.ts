import { GlobalResponse } from "@/types";
import { CreateOrUpdateReview, Review } from "@/types/review";
import api from ".";

export const createReview = async ({
  id,
  data
}: {
  id: string;
  data: CreateOrUpdateReview;
}): Promise<GlobalResponse<Review>> => {
  try {
    const res = await api.post("games/reviews/" + id, data);
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
