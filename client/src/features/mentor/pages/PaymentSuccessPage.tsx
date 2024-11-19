import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/profile/bookings')
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" dark:bg-transparent bg-white rounded-lg max-w-lg  p-8 flex flex-col items-center  w-full">
        <div className="bg-emerald-100 rounded-full p-2 mb-6">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>

        {/* <div className="text-4xl font-bold dark:text-white  text-gray-900 mb-2">500</div> */}

        <div className="text-gray-600 text-center  dark:text-white mb-2">Booking completed</div>

        {/* <div className="text-gray-900 font-medium  dark:text-white mb-6">
        4324234
        </div> */}

        <Button
          onClick={handleRedirect}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
