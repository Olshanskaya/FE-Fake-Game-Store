import { GameDashboard } from "@/components/dashboard/GameDashboard";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { useState } from "react";

export function Dashboard() {
  const [option, setOption] = useState("users");

  return (
    <ResizablePanelGroup direction="horizontal" className="p-6">
      <ResizablePanel className="flex flex-col space-y-4 p-6">
        <Button variant="ghost" onClick={() => setOption("users")}>
          Users Dashboard
        </Button>
        <Button variant="ghost" onClick={() => setOption("games")}>
          Games Dashboard
        </Button>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-6">
        {option === "users" && <UserDashboard />}
        {option === "games" && <GameDashboard />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
