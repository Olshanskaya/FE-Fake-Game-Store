import { verifyEmail } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  if (!token) return <p>Invalid token</p>;

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser", token.toString()],
    queryFn: () => verifyEmail(token)
  });

  if (isLoading) return <p>Loading...</p>;

  const handleNavigationHome = () => {
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
