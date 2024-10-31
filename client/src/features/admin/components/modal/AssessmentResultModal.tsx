import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Github, Linkedin, CheckCircle2 } from "lucide-react";
import { useUpdateTestMutation } from "@/features/assessment/services/api/assessementApi";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";

interface IAssessmentResultModalProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedResult?: any;
  onSuccess: () => void;
}
const feedbackSchema = z.object({
  feedback: z.string().min(5, "Feedback must be at least 5 characters."),
});

export const AssessmentResultModal = ({
  dialogOpen,
  setDialogOpen,
  selectedResult,
  onSuccess,
}: IAssessmentResultModalProps) => {
  const { toast } = useToast();

  const [updateTest] = useUpdateTestMutation();

  // for when decline need open input box
  const [onRejct, setOnReject] = useState<boolean>(false);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  //it for validation eachc change and submit validation for inpt
  const validateFeedback = (input: string) => {
    const validationResult = feedbackSchema.safeParse({ feedback: input });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  //   live valdation
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFeedbackInput(input);
    validateFeedback(input);
  };

  const handleAccept = async () => {
    try {
      await updateTest({
        id: selectedResult.id,
        result: "passed",
      }).unwrap();

      toast({
        description: (
          <div className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            Assessment accepted successfully
          </div>
        ),
      });
      onSuccess();
      setDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assessment status",
      });
    }
  };

  const handleReject = async () => {
    if (!onRejct) {
      setOnReject(true);
      return;
    }

    if (!validateFeedback(feedbackInput)) return;

    try {
      await updateTest({
        id: selectedResult.id,
        result: "failed",
        resultFeedback: feedbackInput,
      }).unwrap();

      toast({
        description: (
          <div className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            result updated successfully
          </div>
        ),
      });
      onSuccess();
      resetState();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assessment status",
      });
    }
  };

  if (!selectedResult) {
    return null;
  }

  const resetState = () => {
    setFeedbackInput("");
    setOnReject(false);
    setError(null);
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) resetState();
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-screen-2xl">
        <DialogHeader>
          <DialogTitle>Assessment Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>mentor request details</DialogDescription>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Bio</h4>
                <p className="text-sm text-gray-500">{selectedResult?.bio}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium">Headline</h4>
                <p className="text-sm text-gray-500">
                  {selectedResult?.headline}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {selectedResult?.githubUrl && (
                <a
                  href={selectedResult.githubUrl}
                  target="_blank"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-900"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </a>
              )}

              {selectedResult?.linkedinUrl && (
                <a
                  href={selectedResult?.linkedinUrl}
                  target="_blank"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-900"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stack</span>
              <span className="font-medium">
                {selectedResult?.stackId?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Experience</span>
              <span className="font-medium">
                {selectedResult?.expirience} + years
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Score</span>
              <span className="font-medium">{selectedResult?.percentage}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-medium ${
                  selectedResult.result === "passed"
                    ? "text-green-500"
                    : selectedResult.result === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {selectedResult.result}
              </span>
            </div>
            {selectedResult.result === "failed" && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">feedback</span>
                <span className={`font-medium text-red-500`}>
                  {selectedResult.resultFeedback}
                </span>
              </div>
            )}
          </div>
          {onRejct && (
            <div className="">
              {error && <p className="text-red-500 text-xs mb-1 ">{error}</p>}
              <Input
                id="feedback"
                value={feedbackInput}
                onChange={handleFeedbackChange}
                placeholder="Enter feedback for rejection"
                className={`${error && " border-red-500"}`}
              />
            </div>
          )}

          {selectedResult.result === "pending" && (
            <div className="flex justify-end">
              <Button
                onClick={handleReject}
                className="flex items-center hover:text-red-900  text-red-500 space-x-2"
              >
                {onRejct ? "Submit" : "Decline"}
              </Button>
              <></>
              {!onRejct && (
                <Button
                  onClick={handleAccept}
                  className="flex items-center  text-green-500 space-x-2"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Accept Assessment
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
