import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateStackMutation } from "@/features/assessment/services/api/assessementApi";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

const stackNameSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "At least 3 characters needed" })
    .regex(/^[A-Za-z\s]+$/, { message: "Only alphabetic characters" }),
});

interface CreateStackProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  refetchStacks: () => void;
}

export const CreateStackModal: React.FC<CreateStackProps> = ({
  dialogOpen,
  setDialogOpen,
  refetchStacks,
}) => {
  const [stackname, setStackname] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  //api

  const [trigger] = useCreateStackMutation({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = stackNameSchema.safeParse({ title: stackname });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }
    try {
      await trigger({ name: stackname }).unwrap();
      toast({
        description: (
          <>
            <CircleCheck color="green" className="inline-block mr-2" />
            Stack created successfully!
          </>
        ),
        className: "border-none",
        variant: "default",
      });
      setDialogOpen(false);
      setError(null);
      setStackname("");
      refetchStacks();
    } catch (error) {
      console.log(error, "error");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setStackname(input);
    validateStackName(input);
  };

  const validateStackName = (input: string) => {
    const validationResult = stackNameSchema.safeParse({ title: input });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
    } else {
      setError(null);
    }
  };
  return (
    <AlertDialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (dialogOpen) {
          setError(null);
          setStackname("");
        }
        setDialogOpen(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create A stack</AlertDialogTitle>
          <AlertDialogDescription className="pb-4">
            Please enter a stack name. Only alphabetic characters are allowed
            and it must be at least 3 characters long.
          </AlertDialogDescription>
          <Input
            className={`${error && " border-red-500"}`}
            value={stackname}
            onChange={handleChange}
            id="stack"
            placeholder="Enter Stack name"
          />
          {error && <p className="text-red-500 text-xs mb-1 ">{error}</p>}
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleSubmit} variant={"submit"}>
           Create
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
