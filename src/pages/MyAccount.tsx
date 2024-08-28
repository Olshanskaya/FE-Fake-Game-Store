import { useAuth } from "@/auth/AuthProvider";

export function MyAccount() {
  const { user } = useAuth();

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Me: </h1>
        <p>{user.email}</p>
        <p>{user.name}</p>
        <p>{user.role}</p>
        <p>{user.id}</p>
    </div>
  );
}
