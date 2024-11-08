import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  GithubIcon,
  IndianRupee,
  LinkedinIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useFetchMentorBookingsByIdQuery,
  useGetAvailabilityOfMentorQuery,
  useGetMentorDetailsQuery,
} from "../services/api/mentorApi";
import { availabilityArrange } from "@/features/mentor/libs/availbilityutil";
import { WeeklySchedule } from "../types/mentor";
import ReservationPage from "../components/publicview/ReservationPage";

interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  date: string;
}

const MentorProfile = () => {
  const { mentorId } = useParams();

  const { data: mentorDetails, isLoading: mentorLoading } =
    useGetMentorDetailsQuery(mentorId!);
  const { data: availabilityData, isLoading: availabilityLoading } =
    useGetAvailabilityOfMentorQuery(mentorId!);
  //only need know created if there is completed that will take care by validation only show upcomings days
  const { data: bookingDetailsOfMentor, isLoading: mentorBookingDetails } =
    useFetchMentorBookingsByIdQuery({
      mentorId: mentorId!,
      status: "created",
    });
  console.log(bookingDetailsOfMentor, "bookingDetailsOfMentor");
  const dateRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [currentDayTimeSlots, setCurrentDayTimeSlots] = useState<TimeSlot[]>(
    []
  );
  const [isReserved, setIsReserved] = useState<boolean>(false);

  const [booked, setBooked] = useState(["2024-11-10T10:00"]);
  const { toast } = useToast();
  useEffect(() => {
    if (availabilityData) {
      // this for getting possible avaialble freee days for a mentor to book in this month utill
      const dates = availabilityArrange(availabilityData.weeklySchedule);
      setAvailableDates(dates);
    }

    // this trigger hwen a date selects and the primary gaol of adding date here to get
    // rid of dupilcate selection like when user select one time if not date added that will
    // also select same time diff dates

    if (selectedDate && availabilityData?.weeklySchedule) {
      // here in array like [month, dateofdat, day ] so i want week day to get
      const dayOfWeek = selectedDate
        .split(" ")
        .at(-1)
        ?.toLowerCase() as keyof WeeklySchedule;

      const daySchedule = availabilityData?.weeklySchedule[dayOfWeek];
      if (daySchedule && daySchedule.isAvailable && daySchedule.timeSlots) {
        const selectedDateParts = selectedDate.split(" ");
        const selectedDateObj = new Date(
          `${selectedDateParts[0]} ${
            selectedDateParts[1]
          }, ${new Date().getFullYear()}`
        );
        //added concat for giving if only give date that will select all time that inside a daya
        const timeSlotsWithDate = daySchedule.timeSlots
          .map((slot) => {
            //to iso stirng to date obj
            const slotStartTime = `${selectedDateObj
              .toISOString()
              .slice(0, 10)}T${
              parseInt(slot.startTime) +
              (slot.startTime.includes("PM") && parseInt(slot.startTime) !== 12
                ? 12
                : 0)
            }:00`;
            console.log(slotStartTime, "slorte");
            console.log(slotStartTime);
            return {
              ...slot,
              date: slotStartTime,
              isBooked: booked.includes(slotStartTime),
            };
          })
          .filter((slot) => !slot.isBooked);
        setCurrentDayTimeSlots(timeSlotsWithDate);
      } else {
        setCurrentDayTimeSlots([]);
      }
    }
  }, [availabilityData, selectedDate]);
  const handleSelectTime = (slot: string) => {
    setSelectedTime(slot);
  };

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    return `${slot.startTime} - ${slot.endTime}`;
  };

  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(selectedTime,selectedTime?.split('T').at(-1), "date and time",);
    if (!selectedDate || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Uh oh! Select Properly.",
        description: "Select one Date and Time.",
      });
      return;
    }
  };
  //   const scroll = (direction) => {
  //     const container = dateRef.current;
  //     if (!container) return;

  //     const scrollAmount = 200;
  //     const currentScroll = container.scrollLeft;
  //     const newScroll =
  //       direction === "left"
  //         ? currentScroll - scrollAmount
  //         : currentScroll + scrollAmount;

  //     container.scrollTo({
  //       left: newScroll,
  //       behavior: "smooth",
  //     });
  //   };
  if (mentorLoading || availabilityLoading || mentorBookingDetails) {
    return <>loading bro please wait</>;
  }
  return (
    <>
      {isReserved ? (
        <div className="relative  flex-col  items-center">
          <div className="w-full items-center min-h-screen pb-20">
            <ReservationPage mentorDetails={mentorDetails as any} />
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex">
            <div className="w-full sm:w-3/4 min-h-screen pb-20">
              <Container className="p-5 border ">
                {/* div for contenet like profile and user name and headlin  */}
                <div className="w-full  mt-16 border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black  rounded-lg ">
                  <div className="w-full h-48 sm:h-64 rounded-t-lg relative">
                    <div className="absolute inset-0  rounded-t-lg">
                      <img
                        src={
                          mentorDetails?.userId?.avatar
                            ? mentorDetails.userId.avatar
                            : "https://github.com/shadcn.png"
                        }
                        alt="cover"
                        className="w-full h-full object-cover rounded-t-lg opacity-20"
                      />
                    </div>
                    <div className="absolute flex gap-4 right-3 -bottom-6 ">
                      <GithubIcon
                        onClick={() =>
                          handleRedirect(mentorDetails?.githubUrl as string)
                        }
                        className="w-4 hover:cursor-pointer h-4 text-[#0077B5]"
                      />
                      <LinkedinIcon
                        onClick={() =>
                          handleRedirect(mentorDetails?.linkedinUrl as string)
                        }
                        className="w-4 hover:cursor-pointer h-4 text-[#0077B5]"
                      />
                    </div>
                    <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                        <img
                          src={
                            mentorDetails?.userId?.avatar
                              ? mentorDetails.userId.avatar
                              : "https://github.com/shadcn.png"
                          }
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pb-9 pt-16  px-6">
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-2xl font-bold">
                          {mentorDetails?.userId?.name}
                        </h1>
                        <p className="text-gray-800 text-xs font-medium dark:text-gray-400">
                          {mentorDetails?.headline}
                        </p>
                        <p className="text-gray-600 text-xs dark:text-gray-400">
                          {`${mentorDetails?.expirience}+ Years expirience`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* div for about (in db bio)  */}

                <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black  rounded-lg">
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-3">About</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {mentorDetails?.bio}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-base font-semibold mb-2">
                        Languages That He Speak
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mentorDetails?.languages.map((language) => (
                          <span className="text-xs px-2 py-1 dark:border dark:bg-transparent bg-gray-100 rounded-md">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* for mentors specific skill they achived  */}

                <div className="min-w-full mt-4 shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg">
                  <div className="p-3 flex flex-wrap gap-2 items-center">
                    {mentorDetails?.assessedSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-700 text-blue-700 dark:text-blue-300 text-xs rounded hover:bg-blue-100 dark:hover:bg-gray-800 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Container>
            </div>

            {/* side div for booking */}
            <div className="hidden mt-16 sm:block w-1/4 fixed top-17 right-0 min-h-screen overflow-y-auto bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800">
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-purple-600">
                      Book a Free 1:1 Trial:
                    </h2>
                    <p className="text-gray-600 text-xs dark:text-gray-400">
                      To Plan Your Mentorship with {mentorDetails?.userId.name}
                    </p>
                  </div>
                  <hr />
                  <div>
                    {/* for availble date head  */}
                    <div className="flex pb-3 pt-3 justify-between items-center mb-2">
                      <h3 className="font-medium">Available Dates</h3>
                      <div className="flex">
                        <button className="text-gray-400 hover:text-gray-600">
                          <ChevronLeft />
                        </button>
                        <button
                          // onClick={() => scroll("right")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>

                    <div
                      ref={dateRef}
                      className="grid grid-flow-col auto-cols-max overflow-x-auto scrollbar-hide pb-4 gap-3"
                    >
                      {availableDates &&
                        availableDates.map((date: string) => {
                          const [_, day, weekday] = date.split(" ");
                          return (
                            <button
                              key={date}
                              onClick={() => handleSelectedDate(date)}
                              className={`border ${
                                selectedDate === date && "border-blue-500"
                              } rounded-lg p-2 text-center hover:border-blue-500 cursor-pointer`}
                            >
                              <div className="text-sm text-gray-500">
                                {weekday}
                              </div>
                              <div className="font-medium">{day}</div>
                              <div className="text-xs text-green-500">
                                13 Slots
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  <hr />

                  {/* avalible slots for mentor  */}
                  <div className="pt-4">
                    <div className="flex  justify-between items-center mb-2">
                      <h3 className="font-medium">Available Slots</h3>
                      <div className="flex ">
                        <button className="text-gray-400 hover:text-gray-600">
                          <ChevronLeft />
                        </button>
                        <button
                          // onClick={() => scroll("right")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                    <div className="grid pt-3 pb-3 grid-flow-col auto-cols-max overflow-x-auto scrollbar-hide gap-3">
                      {currentDayTimeSlots?.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectTime(slot.date)}
                          className={` ${
                            selectedTime === slot.date && "border-blue-500"
                          } border rounded-lg p-2 text-center hover:border-blue-500 cursor-pointer`}
                        >
                          {formatTimeSlot(slot)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    variant={"submit"}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                  {/* footer for booking div  */}
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span>For:</span>
                      <span>Technical Interview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Duration:</span>
                      <span>30 mins 1:1 call with the mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MentorProfile;
