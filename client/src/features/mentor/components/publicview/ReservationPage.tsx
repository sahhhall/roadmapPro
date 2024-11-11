import React, { useEffect, useState } from "react";
import { IMentorDetailsResponse } from "@/features/user/types/mentor";
import { PaymentSummary } from "@/features/mentor/components/publicview/PaymentSummary";
import { Timer } from "lucide-react";
import ExpiryModal from "@/features/mentor/components/modals/ExpiryModal";
import { getDayYearByDateString } from "@/features/mentor/libs/timeHelpers";
import { IGetMenotrsBookingsResponse } from "../../types/mentor";

interface IReservationProps {
  mentorDetails: IMentorDetailsResponse | undefined;
  price: number;
  bookedDate: string;
  setIsReserved: React.Dispatch<React.SetStateAction<boolean>>;
  bookingDetails: IGetMenotrsBookingsResponse
}

const ReservationPage: React.FC<IReservationProps> = ({
  mentorDetails,
  price,
  bookedDate,
  setIsReserved,
  bookingDetails
}) => {
  const [expire, setExpire] = useState<number>(300);
  const [expiryDialog, setExpiryModal] = useState<boolean>(false);
  const setOpenExipiry = () => setExpiryModal(true);
 
      
 
  useEffect(() => {
    const timer = setInterval(() => {
      setExpire((prevExpire) => {
        if (prevExpire <= 1) {
          clearInterval(timer);
          setOpenExipiry();
          return 0;
        }
        return prevExpire - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative  min-h-screen  flex-col w-full  items-center flex pb-20">
      <div className="mt-16 flex">
        <div className="flex pt-5">
          <Timer className="w-4 h-4 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {expire === 0 ? "Session expired" : `Session expires in ${expire}`}
          </p>
        </div>
      </div>

      <div className="flex sm:mt-16  lg:flex-row flex-col lg:justify-between  w-full gap-6 p-4">
        <div className="w-full mt-1 sm:mt-16 lg:w-full">
          <div className="border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black rounded-lg">
            <div className="flex  flex-row">
              <div className="sm:min-w-[13rem]  hidden sm:block  min-h-fit   ">
                <img
                  src="https://github.com/shadcn.png"
                  className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                  alt={`${mentorDetails?.userId.name}'s profile`}
                />
              </div>
              <div className="flex flex-col p-4">
                <p className="text-lg font-semibold">
                  {mentorDetails?.userId.name}
                </p>
                <p className="text-xs  text-gray-600 dark:text-gray-300">
                  {mentorDetails?.bio}
                </p>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <p className="text-gray-500">{getDayYearByDateString(bookedDate)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full items-center   lg-flex-end  lg:w-3/4">
          <div className="  border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black rounded-lg">
            <PaymentSummary bookingDate={getDayYearByDateString(bookedDate)} bookingDetails={bookingDetails} mentorDetails={mentorDetails} price={price} />
          </div>
        </div>
      </div>
      <ExpiryModal setIsReserved={setIsReserved} open={expiryDialog} setDialogExpiry={setExpiryModal} />
    </div>
  );
};

export default ReservationPage;
