import { verifyEmail } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import toast from "react-hot-toast";
import { useAuth } from "@/auth/AuthProvider";

export function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { logOut } = useAuth();

  if (!token) return <p>Invalid token</p>;

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser", token.toString()],
    queryFn: () => verifyEmail(token)
  });

  if (isLoading) return <Loading></Loading>;

  const handleNavigationHome = () => {
    toast.success("Email confirmed. Now Login to continue");
    logOut();
    navigate(`/`);
  };

  return (
    <div className="place-content-center">
      <h1>Thank you!</h1>
      <p>{user?.data?.user.name}</p>
      <p>Your e-mail has been confirmed</p>
      <Button onClick={handleNavigationHome}>Go back to Games List</Button>
    </div>
  );
}
