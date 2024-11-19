import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

export type DialogType = "early" | "past" | null;

interface TimeDetails {
  hoursLeft: number;
  minutesLeft: number;
}

interface DialogEarlyJoiningProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinAnyway: () => void;
  dialogType: DialogType;
  timeDetails?: TimeDetails;
}

const DialogEarlyJoining: React.FC<DialogEarlyJoiningProps> = ({
  isOpen,
  onClose,
  onJoinAnyway,
  dialogType,
  timeDetails,
}) => {
  if (!dialogType) return null;

  const dialogContent = {
    early: {
      title: "Warning: Early Join Attempt",
      description: `This session is scheduled to start in ${timeDetails?.hoursLeft} hours and ${timeDetails?.minutesLeft} minutes. Joining now may mean waiting in an empty room. Are you sure you want to proceed?`,
      primaryAction: "Join Anyway",
      secondaryAction: "Wait for Session",
      primaryHandler: onJoinAnyway,
      secondaryHandler: onClose,
      icon: <AlertTriangle className="h-6 text-orange-800 w-6 " />,
    },
    past: {
      title: "Warning: Session Unavailable",
      description:
        "This session has either already started or has ended. Please check your schedule for the correct timing.",
      primaryAction: "Close",
      primaryHandler: onClose,
      icon: <AlertTriangle className="h-6 text-red-500 w-6 " />,
    },
  }[dialogType];

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="p-1">{dialogContent.icon}</div>
            <div className="flex-1">
              <AlertDialogTitle
                className={`text-lg font-semibold ${
                  dialogContent.secondaryAction
                    ? "text-orange-800"
                    : "text-red-500"
                } `}
              >
                {dialogContent.title}
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-2 text-gray-600">
                {dialogContent.description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          {dialogContent.secondaryAction && (
            <AlertDialogCancel
              onClick={dialogContent.secondaryHandler}
              className="border-gray-200 hover:bg-gray-100"
            >
              {dialogContent.secondaryAction}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={dialogContent.primaryHandler}
            className={
              dialogType === "early"
                ? "bg-orange-800 text-white hover:bg-orange-800 transition-colors"
                : "bg-red-500 text-white"
            }
          >
            {dialogContent.primaryAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogEarlyJoining;
