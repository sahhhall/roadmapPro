import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useBlockuserMutation } from "@/features/admin/services/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { IUser } from "../../types/admin";

interface DropDownProps {
  user: IUser;
}

const DropDown: React.FC<DropDownProps> = ({ user }) => {
  const [blockuser, { isLoading }] = useBlockuserMutation();
  const { toast } = useToast();
  const handleBlockUnblock = async () => {
    try {
      await blockuser({ email: user.email }).unwrap();
      toast({
        description: "User has been blocked/unblocked successfully",
      });
    } catch (error: any) {
      console.error("Failed to block/unblock user:", error);
      const errorMessage =
        error?.data?.message ||
        "An unexpected error occurred. Please try again later.";
      toast({
        description: errorMessage,
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleBlockUnblock}>
          {isLoading ? "Loading..." : user.isBlocked ? "Unblock" : "Block"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
