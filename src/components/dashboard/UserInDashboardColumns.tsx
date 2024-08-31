"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { updateUserRole } from "@/api/user";

export const UserInDashboardColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "activeStatus",
    header: "Status"
  },
  {
    id: "actions2",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const handleChangeRole = (user: User) => {
        if (user.role === "USER") {
          updateUserRole(user.id, { role: "ADMIN" });
        } else {
          updateUserRole(user.id, { role: "USER" });
        }
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleChangeRole(user)}>
                Change User Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
