import { Button } from "@/components/ui/button";

interface AvailabilitySectionProps {
    openAvailabilityDialog: () => void;
  }
  
  export const AvailabilitySection = ({ openAvailabilityDialog }: AvailabilitySectionProps) => (
    <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black rounded-lg">
      <div className="p-3 flex-wrap items-center space-x-2">
        <Button
          onClick={openAvailabilityDialog}
          className="w-full border-blue-100"
          variant="outline"
        >
          Manage Availability
        </Button>
      </div>
    </div>
  );
  