import { Button } from "@/components/ui/button";
import { usegetUser } from "@/hooks/usegetUser";

interface IInstructionProps {
  onStart: () => void;
}
const InstructionsPage: React.FC<IInstructionProps> = ({ onStart }) => {
  const user = usegetUser();
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-black text-white p-12 flex flex-col justify-center">
        <div className="max-w-xl">
          <p className="text-gray-400 mb-4">Hey {user?.name},</p>
          <h1 className="text-4xl font-bold leading-tight mb-16">
            Welcome to RoadmapPro MERN (Advanced) Skills Assessment Test
          </h1>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <p className="text-sm text-gray-400 mb-1">Test duration</p>
              <p className="text-xl font-medium">5 mins</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">No. of questions</p>
              <p className="text-xl font-medium">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold mb-8">Instructions</h2>
          <ol className="space-y-6 text-gray-600">
            <li className="flex gap-3">
              <span className="font-medium">1.</span>
              <span>
                This is a timed test. Please make sure you are not interrupted
                during the test, as the timer cannot be paused once started.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium">2.</span>
              <span>Please ensure you have a stable internet connection.</span>
            </li>
          </ol>

          <div className="mt-12 flex justify-end">
            <Button
              onClick={onStart}
              className="bg-black text-white hover:bg-gray-800 px-6"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
