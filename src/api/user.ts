import { GlobalResponse } from "@/types";
import { UpdateUserRole, User } from "@/types/user";
import api from ".";
import { useQueryClient } from "@tanstack/react-query";

export const getAllUsers = async (): Promise<GlobalResponse<User[]>> => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateUserRole = async ({
  id,
  data
}: {
  id: string;
  data: UpdateUserRole;
}): Promise<GlobalResponse<User>> => {
  // const queryClient = useQueryClient();
  try {
    const res = await api.patch("users/role/" + id, data);
    // queryClient.invalidateQueries({ queryKey: ["allUsersList"] });
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
