import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface AvatarActionsProps {
    photoSubmitLoading: boolean;
    handleSaveBasicProfile: (fieldName: string, value: string | File) => void;
    updatedAvatar: string;
    setUpdatedAvatar: (value: string | null) => void;
    inputFileRef: React.RefObject<HTMLInputElement>;
  }
  
  export const AvatarActions = ({
    photoSubmitLoading,
    handleSaveBasicProfile,
    updatedAvatar,
    setUpdatedAvatar,
    inputFileRef,
  }: AvatarActionsProps) => (
    <div className="absolute bottom-0 flex justify-end w-full px-6 space-x-2 pb-4">
      <Button
        onClick={() => handleSaveBasicProfile("avatar", updatedAvatar)}
        className="border bg-black text-white hover:bg-gray-900 rounded-sm text-xs px-3"
      >
        {photoSubmitLoading ? <Loader2Icon className="animate-spin" /> : "Save"}
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setUpdatedAvatar(null);
          if (inputFileRef.current) inputFileRef.current.value = "";
        }}
        className="border bg-white text-black hover:bg-gray-100 rounded-sm text-xs px-3"
      >
        Cancel
      </Button>
    </div>
  );
  