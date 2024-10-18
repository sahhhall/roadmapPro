import React, {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useGetRoadmapsByStatusQuery } from "@/features/roadmaps/services/api/roadmapApi";
import { Input } from "@/components/ui/input";

import { z } from "zod";
const feedbackSchema = z.object({
  feedback: z.string().min(5, "Feedback must be at least 5 characters."),
});
interface RoadMapReqModalProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

const RequestsModal: React.FC<RoadMapReqModalProps> = ({
  dialogOpen,
  closeDialog,
}) => {
  const { data: draftedItems,refetch } = useGetRoadmapsByStatusQuery({ status: 'drafted' });
  const [feedbackInput, setFeedbackInput] = useState("");
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  //need to select one id for when new input comes i mea submimt case
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(
    null
  );
 
  const [error, setError] = useState<string | null>(null);
  const openRoadmapInNewTab = (id: string) => {
    const url = `http://localhost:5173/roadmap/${id}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    if (dialogOpen) {
      refetch(); 
    }
  }, [dialogOpen, refetch]); 

  const updateRoadmapStatus = async (
    id: string,
    status: string,
    feedback: string = ""
  ) => {
    try {
      console.log(id, status, feedback);
    } catch (error) {
      console.error("Error updating roadmap status:", error);
    }
    setShowFeedbackInput(false);
    setFeedbackInput("");
    setSelectedRoadmapId(null);
  };
  //show new inout box for sent feedback
  const handleReject = (id: string) => {
    setSelectedRoadmapId(id);
    setShowFeedbackInput(true);
  };

  const validateFeedback = (input: string) => {
    const validationResult = feedbackSchema.safeParse({ feedback: input });
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
    } else {
      setError(null);
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFeedbackInput(input);
    validateFeedback(input);
  };

  //it trigger when click submit on input box submit with feedcha
  const submitRejection = () => {
    if (!error && selectedRoadmapId) {
      updateRoadmapStatus(selectedRoadmapId, "rejected", feedbackInput);
    }
  };

  const resetState = () => {
    setFeedbackInput("");
    setShowFeedbackInput(false);
    setSelectedRoadmapId(null);
    setError(null);
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) resetState(); 
    closeDialog(); 
  };


  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-h-[60vh] overflow-auto scrollbar-hide">
        <DialogHeader className="space-y-3">
          <DialogTitle>Roadmap Requests</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          {draftedItems?.map((roadmap) => (
            <div
              key={roadmap.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-semibold text-sm">{roadmap?.title}</h3>
                <p className="text-xs text-gray-500">{roadmap?.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => openRoadmapInNewTab(roadmap.id)}
                >
                  View
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="w-5 h-5 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        updateRoadmapStatus(roadmap.id, "published")
                      }
                    >
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReject(roadmap.id)}>
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {showFeedbackInput && (
          <div className="">
            {error && <p className="text-red-500 text-xs mb-1 ">{error}</p>}
            <Input
              id="feedback"
              value={feedbackInput}
              onChange={handleFeedbackChange}
              placeholder="Enter feedback for rejection"
              className={`${error && " border-red-500"}`}
            />
            <Button
              onClick={submitRejection}
              variant={"submit"}
              className="mt-2 w-full"
            >
              Submit Rejection
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestsModal;
