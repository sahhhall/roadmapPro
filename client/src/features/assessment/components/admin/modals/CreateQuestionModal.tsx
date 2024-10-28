import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import React from "react";
import QuestionCreationForm from "../forms/createFormModal";

interface ICreateQuestionProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  refetchQuestions: () => void;
}

export const CreateQuestionModal: React.FC<ICreateQuestionProps> = ({
  dialogOpen,
  setDialogOpen,
  refetchQuestions,
}) => {
  const handleFormSubmitSuccess = () => {
    setDialogOpen(false); 
  };
  return (
    <AlertDialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create A question</AlertDialogTitle>
          <AlertDialogDescription className="pb-4">
            Please enter a question details.
          </AlertDialogDescription>
          <QuestionCreationForm
            refetchQuestions={refetchQuestions}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
