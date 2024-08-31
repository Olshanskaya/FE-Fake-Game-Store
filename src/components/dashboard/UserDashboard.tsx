import { useMutation, useQuery } from "@tanstack/react-query";
import { DataTable } from "../DataTable";
import { getAllUsers, updateUserRole } from "@/api/user";
import { UserInDashboardColumns } from "./UserInDashboardColumns";

export function UserDashboard() {
  const { data: usersListResponse, isLoading } = useQuery({
    queryKey: ["allUsersList"],
    queryFn: () => getAllUsers()
  });


  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>UserDashboard</h1>
      <DataTable columns={UserInDashboardColumns} data={usersListResponse?.data || []} />
    </div>
  );
}
