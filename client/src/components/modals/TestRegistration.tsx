import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import MentorDetailsSubmissionForm from "@/features/user/components/mentortest/MenotrDetailsForm";
  
  interface ITestRegistration {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
  }
  
  const TestRegistration: React.FC<ITestRegistration> = ({
    dialogOpen,
    setDialogOpen,
  }) => {
    return (
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
      >
        <DialogContent className="rounded border md:max-h-full max-w-screen-lg">
          <div className=" ">
            <DialogHeader className="space-y-1 pb-2">    
              <DialogTitle>Become a Mentor</DialogTitle>
              <DialogDescription className="text-xs">
                Please fill in your details to become a mentor ( after a submission there will be a test ).
              </DialogDescription>
            </DialogHeader>
            <div className="px-2 max-h-[60vh] sm:max-h-[98vh] overflow-scroll md:overflow-hidden  ">
              <MentorDetailsSubmissionForm />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TestRegistration;