import { useAuth } from "@/auth/AuthProvider";
import { Button } from "../ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditGameDialog } from "./EditUserInfoDialog";

export function UserInfo() {
  const { user } = useAuth();
  return (
    <Card className="max-w-lg mx-auto mt-8 bg-[var(--card)] text-[var(--card-foreground)] rounded-[var(--radius)] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[var(--foreground)]">User Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Username:</strong> {user?.name}
        </p>
        <p>
          <strong>Address:</strong> {user?.address}
        </p>
        <p>
          <strong>Birth Date:</strong> {user?.birthDate?.toString()}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
              user?.activeStatus === "UNVERIFIED"
                ? "bg-[var(--destructive)] text-[var(--destructive-foreground)]"
                : "bg-[var(--primary)] text-[var(--primary-foreground)]"
            }`}
          >
            {user?.activeStatus}
          </span>
        </p>
        {user?.activeStatus === "UNVERIFIED" && (
          <p className="mt-4 font-medium text-[var(--destructive)]">Verify Your Email</p>
        )}
        <EditGameDialog></EditGameDialog>
      </CardContent>
    </Card>
  );
}
