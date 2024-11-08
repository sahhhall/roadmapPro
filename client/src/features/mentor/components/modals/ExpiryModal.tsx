import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface IExpiryModalProps {
  open: boolean;
  setDialogExpiry: (open: boolean) => void;
  setIsReserved: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpiryModal: React.FC<IExpiryModalProps> = ({
  open,
  setDialogExpiry,
  setIsReserved
}) => {
  const handleNavigate = () => {
    setIsReserved((prev) => !prev);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={(open) => setDialogExpiry(open)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time's up</AlertDialogTitle>
            <AlertDialogDescription>
              Your session has expired. Please book again to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={"outline"} onClick={handleNavigate}>
              Book Again
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExpiryModal;
