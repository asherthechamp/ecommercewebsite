import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDropdownItem } from "./_components/UserActions";

export default function AdminUsersPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Users</PageHeader>
      </div>
      <UsersTable />
    </>
  );
}

export async function UsersTable() {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  if (users.length === 0) return <p> No users found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Users</span>
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatNumber(user.orders.length)}</TableCell>
              <TableCell>
                {formatCurrency(
                  user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) /
                    100
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropdownItem id={user.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
