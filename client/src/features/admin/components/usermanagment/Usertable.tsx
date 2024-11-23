import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DropDown from "./DropDown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAccessStyle } from "../../lib/getAccessStyle";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { useFetchusersQuery } from "@/features/admin/services/api/authApi";
import { dateFormatter } from "@/lib/formatters";
import { AvatarFallback } from "@radix-ui/react-avatar";

const UserTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, refetch, isLoading } = useFetchusersQuery({
    page,
    pageSize,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    refetch();
  }, [page]);

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  return (
    <Container className="justify-center">
      <div className="flex justify-center mt-4">
        <Input ref={inputRef} placeholder="Search..." className="w-[300px]" />
      </div>

      <Table className="mt-5">
        <TableCaption>
          A list of registered users and their access status.
        </TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-black dark:border">
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            data?.users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium mt-3 flex gap-4">
                  <Avatar className="w-10 h-10 rounded-full">
                    <AvatarImage
                      src={user?.avatar}
                      className="rounded-full w-full h-full"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-gray-500 text-xs">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={getAccessStyle(user.role)}>{user.role}</span>
                </TableCell>
                <TableCell
                  className={`w-20 ${
                    user.isBlocked ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </TableCell>
                <TableCell>{dateFormatter(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropDown user={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default UserTable;
