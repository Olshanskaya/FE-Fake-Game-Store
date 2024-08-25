export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  UNVERIFIED = "UNVERIFIED",
  NOT_ACTIVE = "NOT_ACTIVE"
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  birthDate: Date;
  activeStatus: UserStatus;
  address: string;
  phone: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPassword = {
  email: string;
};

export type LoggedInUser = {
  token: string;
  user: User;
};

export type LoginUserUser = {
  email: string;
  password: string;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};

export type UpdatePassword = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type UpdateUser = {
  name: string;
  email: string;
  birthDate: Date;
  address: string;
  phone: string;
};

export type UpdateUserRole = {
  role: string;
};
