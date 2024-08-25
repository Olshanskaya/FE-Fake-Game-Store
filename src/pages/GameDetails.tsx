import { useNavigate, useParams } from "react-router-dom";

export function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1>GameDetails: {id}</h1>
    </div>
  );
}
