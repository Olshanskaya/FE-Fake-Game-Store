"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";

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
  }
];