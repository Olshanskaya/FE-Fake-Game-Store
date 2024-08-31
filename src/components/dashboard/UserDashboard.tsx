import { getAllUsers } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../DataTable";
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
