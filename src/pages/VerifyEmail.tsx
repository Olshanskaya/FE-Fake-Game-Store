import { verifyEmail } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function VerifyEmail() {
  const { token } = useParams();

  if (!token) return <p>Invalid token</p>;

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser", token.toString()],
    queryFn: () => verifyEmail(token)
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Verify Email</h1>
      <p>{user?.data?.user.email}</p>
      <p>{user?.data?.user.name}</p>
      <p>{user?.data?.user.phone}</p>
      <p>{user?.data?.user.role}</p>
      <p>{user?.data?.token}</p>
    </div>
  );
}
