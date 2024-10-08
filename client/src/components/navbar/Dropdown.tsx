import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, User } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppStore";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/features/auth/api/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { usegetUser } from "@/hooks/usegetUser";

interface DropdownProps {
  handleToggle: () => void;
}

const Dropdown = ({ handleToggle }: DropdownProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = usegetUser();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response);
    if (response.status === 200) {
      dispatch(logout());
      navigate("/");
    } else {
      const errorMessage =
        response.error?.[0]?.message || "Login failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    }
  };

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-8 h-8 rounded-full">
          <Avatar>
            <AvatarImage
              src={user?.avatar ? user.avatar : "https://github.com/shadcn.png"}
              className="rounded-full w-full h-full"
            />
            <AvatarFallback>hihii</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              className="items-center flex gap-2"
              onClick={() => navigate("/profile")}
            >
              <User size={15} />
              <span>Profile</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="items-center">
            <button className="items-center flex gap-2" onClick={handleToggle}>
              <Moon size={15} />
              <span>Switch</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="items-center flex gap-2">
            <LogOut size={15} />
            <button onClick={openDialog}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader className=" space-y-3">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? This action will log you out of
              your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="dark:bg-red-500"
              variant="submit"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dropdown;
