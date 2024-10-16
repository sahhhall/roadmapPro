import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RoadMapReqModalProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}
const roadmapRequests = [
  { id: 1, title: "Frontend Roadmap", description: "React and Tailwind CSS" },
  { id: 2, title: "Backend Roadmap", description: "Node.js and SQL" },
  { id: 3, title: "Full Stack Roadmap", description: "MERN Stack Development" },
  { id: 1, title: "Frontend Roadmap", description: "React and Tailwind CSS" },
  { id: 2, title: "Backend Roadmap", description: "Node.js and SQL" },
  { id: 3, title: "Full Stack Roadmap", description: "MERN Stack Development" },
  { id: 1, title: "Frontend Roadmap", description: "React and Tailwind CSS" },
  { id: 2, title: "Backend Roadmap", description: "Node.js and SQL" },
  { id: 3, title: "Full Stack Roadmap", description: "MERN Stack Development" },
  { id: 1, title: "Frontend Roadmap", description: "React and Tailwind CSS" },
  { id: 2, title: "Backend Roadmap", description: "Node.js and SQL" },
  { id: 3, title: "Full Stack Roadmap", description: "MERN Stack Development" },
  { id: 1, title: "Frontend Roadmap", description: "React and Tailwind CSS" },
  { id: 2, title: "Backend Roadmap", description: "Node.js and SQL" },
  { id: 3, title: "Full Stack Roadmap", description: "MERN Stack Development" },
];

const RequestsModal: React.FC<RoadMapReqModalProps> = ({
  dialogOpen,
  closeDialog,
}) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[60vh]  overflow-auto scrollbar-hide" >
        <DialogHeader className="space-y-3 ">
          <DialogTitle>Roadmap Requests</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          {roadmapRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-semibold text-sm">{request.title}</h3>
                <p className="text-xs text-gray-500">{request.description}</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestsModal;
