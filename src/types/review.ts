export type Review = {
  id: string;
  userId: string;
  gameId: string;
  description: string;
  starRating: number;
  createdAt: Date;
};

export type EmbeddedReview = {
  reviewID: string;
  description: string;
  starRating: number;
  createdAt: Date;
  name: string;
};

export type CreateOrUpdateReview = {
  description: string;
  starRating: number;
};
