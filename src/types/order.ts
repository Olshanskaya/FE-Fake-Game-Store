import { Game } from "./game";
import { User } from "./user";

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  APPROVED = "APPROVED",
  DELIVERED = "DELIVERED",
  DECLINED = "DECLINED"
}

export enum PaymentStatus {
  WAITING = "WAITING",
  PAID = "PAID",
  UNPAID = "UNPAID"
}

export type Order = {
  id: string;
  userId: string;
  totalPrice: number;
  createdAt: Date;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  gameOrders: GameOrder[];
};

export type GameOrder = {
  game: Game;
  quantity: number;
};

export type OrderWithUser = {
  id: string;
  user: User;
  totalPrice: number;
  createdAt: Date;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  gameOrders: GameOrder[];
};

export type Pay = {
  orderId: string;
  isPaidSuccessfully: boolean;
};
