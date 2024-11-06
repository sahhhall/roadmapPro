import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGetAvailabilityOfMentorQuery } from "@/features/mentor/services/api/mentorApi";
import { usegetUser } from "@/hooks/usegetUser";
import {  convertTo24HourFormat, generateTimeSlots } from "@/features/mentor/libs/timeHelpers";
import { timeOptions } from "@/features/mentor/libs/constants";

interface IAvailabilityModalProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

interface DayAvailability {
  isAvailable: boolean;
  from: string;
  to: string;
}





export const AvailabilityModal: React.FC<IAvailabilityModalProps> = ({
  dialogOpen,
  setDialogOpen,
}) => {
  const { toast } = useToast();
  const user = usegetUser();

  const [availability, setAvailability] = useState<
    Record<string, DayAvailability>
  >({
    monday: { isAvailable: false, from: "10:00", to: "17:00" },
    tuesday: { isAvailable: false, from: "10:00", to: "17:00" },
    wednesday: { isAvailable: false, from: "10:00", to: "17:00" },
    thursday: { isAvailable: false, from: "10:00", to: "17:00" },
    friday: { isAvailable: false, from: "10:00", to: "17:00" },
  });

  const shouldFetchForAvailbility = dialogOpen && user?.role == "mentor";
  const { data: myAvailibilityData } = useGetAvailabilityOfMentorQuery(
    user?.id!,
    { skip: !shouldFetchForAvailbility }
  );
  useEffect(() => {
    if (myAvailibilityData?.weeklySchedule) {
      const newAvailability = { ...availability };
      // key as first arr value and key=> value as second array 
      Object.entries(myAvailibilityData.weeklySchedule).forEach(
        ([day, schedule]) => {
          // here i want get short name fo that day then only
          if (schedule.timeSlots.length > 0) {
            const times = schedule.timeSlots.map(
              (slot: { startTime: string; endTime: string }) => ({
                start: convertTo24HourFormat(slot.startTime),
                end: convertTo24HourFormat(slot.endTime),
              })
            );
            //here now we go arra of obj starttimeendtime

            // for getting first time i mean starting that be a smallest
            const starting = times.reduce(
              (acc: any, val: { start: string; end: string }) => {
                if (val.start < acc) {
                  acc = val.start;
                }
                return acc;
              },
              times[0].start
            );

            // for getting last time he slected
            const latestEnd = times.reduce(
              (acc: any, curr: { start: string; end: string }) => {
                if (curr.end > acc) {
                  acc = curr.end;
                }
                return acc;
              },
              times[0].end
            );
            //update the avialbilty day
            newAvailability[day.toLowerCase()] = {
              isAvailable: schedule.isAvailable,
              from: starting,
              to: latestEnd,
            };
          } else {
            newAvailability[day.toLowerCase()] = {
              isAvailable: schedule.isAvailable,
              from: "10:00",
              to: "17:00",
            };
          }
        }
      );

      setAvailability(newAvailability);
    }
  }, [myAvailibilityData]);

  const handleDayToggle = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
      },
    }));
  };

  const handleTimeChange = (
    day: string,
    timeType: "from" | "to",
    value: string
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value,
      },
    }));
  };

  // to apply all day availble
  const handleApplyAllTime = () => {
    //here i set to all enable availbily if that enabled  that will take from predeifned value in above obj
    setAvailability((prev) => {
      const updatedAvailbility = Object.keys(prev).reduce(
        (acc: any, day: string) => {
          acc[day] = {
            ...prev[day],
            isAvailable: true,
          };
          return acc;
        },
        {}
      );
      return updatedAvailbility;
    });
  };
  const handleSubmit = () => {
    // toast({
    //   title: "Availability updated",
    //   description: "Your availability settings have been saved.",
    // });
    const weeklySchedule: any = {};
console.log(availability,"a")
    Object.entries(availability).forEach(([day, availability]) => {
      weeklySchedule[day] = {
        isAvailable: availability.isAvailable,
        timeSlots: availability.isAvailable
          ? generateTimeSlots(availability.from, availability.to)
          : [],
      };
    });

    const payload = {
      mentorId: user?.id,
      weeklySchedule,
    };
    console.log(payload, "avialbility");
    // setDialogOpen(false);
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogContent className="sm:max-w-md ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Availability
          </AlertDialogTitle>
          <div className="text-sm text-gray-500 mt-2">
            You will receive bookings in your local timezone: Asia/Calcutta
          </div>
        </AlertDialogHeader>

        <div className="space-y-4 my-4   ">
          {Object.entries(availability).map(
            ([day, { isAvailable, from, to }]) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-20  items-center flex">
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                  <span className="text-xs ml-2">
                    {day.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                {isAvailable ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">From:</span>
                      <Select
                        onValueChange={(value) =>
                          handleTimeChange(day, "from", value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder={from}>{from}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              disabled={time >= to}
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <span className="text-sm">To:</span>
                      <Select
                        onValueChange={(value) =>
                          handleTimeChange(day, "to", value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder={to}>{to}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              disabled={time <= from}
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Unavailable</span>
                  </div>
                )}
              </div>
            )
          )}

          <button
            onClick={handleApplyAllTime}
            className="text-sm text-blue-600 hover:underline cursor-pointer mt-2"
          >
            To apply this slot to all days Click here
          </button>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button onClick={handleSubmit} variant="default">
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvailabilityModal;
