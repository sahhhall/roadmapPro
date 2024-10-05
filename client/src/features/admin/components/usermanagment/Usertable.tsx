import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DropDown from "./DropDown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAccessStyle } from "../../lib/getAccessStyle";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { useFetchusersQuery } from "@/features/admin/services/api/authApi";

// const users = [
//   {
//     id: "1",
//     name: "John Doe",
//     role: "admin",
//     status: "Active",
//     createdAt: "2023-01-15",
//     email: "sahalvavoor@gmail.com",
//     avatar: "https://github.com/shadcn.png",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     role: "user",
//     status: "Inactive",
//     createdAt: "2022-12-01",
//     email: "sahalvavoor@gmail.com",
//     avatar: "https://github.com/shadcn.png",
//   },
//   {
//     id: "3",
//     name: "Alice Johnson",
//     role: "mentor",
//     status: "Active",
//     createdAt: "2023-03-22",
//     email: "sahalvavoor@gmail.com",
//     avatar: "https://github.com/shadcn.png",
//   },
//   {
//     id: "4",
//     name: "Bob Lee",
//     role: "admin",
//     status: "Suspended",
//     createdAt: "2021-11-08",
//     email: "sahalvavoor@gmail.com",
//     avatar: "https://github.com/shadcn.png",
//   },
// ];

const Usertable = () => {
  const { data } = useFetchusersQuery({});
  return (
    <Container className="justify-center">
      <div className="flex justify-center mt-4  ">
        {/* <h3 className="font-semibold">All Users <span className="text-gray-400" >{users.length}</span></h3> */}
        <Input className="w-[300px]" />
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
          {data?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium flex gap-4">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="rounded-full w-full h-full"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <span> {user.name}</span>
                  <span className="text-gray-500  text-xs">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`${getAccessStyle(user.role)}`}>
                  {user.role}
                </span>
              </TableCell>

              <TableCell
                className={`w-20 ${
                  user.isBlocked ? "text-red-500" : "text-green-500"
                } `}
              >
                {user.isBlocked ? "Blocked" : "Active"}
              </TableCell>
              <TableCell>
                {user.createdAt} ${user.createdAt}
              </TableCell>
              <TableCell className="text-right">
                <DropDown user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Usertable;
