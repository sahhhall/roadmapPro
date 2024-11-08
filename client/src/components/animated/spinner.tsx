import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      </div>
    </>
  );
};

export default Spinner;
