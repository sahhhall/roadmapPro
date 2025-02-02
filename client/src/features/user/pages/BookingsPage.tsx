import { useEffect, useState } from "react";
import { useGetAllBookingDetailsQuery } from "@/features/user/services/api/mentorTestApi";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { usegetUser } from "@/hooks/usegetUser";
import { useNavigate } from "react-router-dom";
import { formatDateAndCalculateTime } from "@/features/mentor/libs/timeHelpers";
import DialogEarlyJoining from "../components/booking/DialogEarlyJoining";

interface DialogState {
  isOpen: boolean;
  dialogType: "early" | "past" | null;
  timeDetails?: {
    hoursLeft: number;
    minutesLeft: number;
  };
  roomId?: string;
}
const BookingsPage = () => {
  const [status, setStatus] = useState("scheduled");
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    dialogType: null,
  });
  const user = usegetUser();
  const navigate = useNavigate();

  const {
    data: bookings,
    isLoading,
    refetch,
  } = useGetAllBookingDetailsQuery({
    mentorId: user?.id,
    status,
  });
  console.log(bookings);

  useEffect(() => {
    refetch();
  }, []);

  const statuses = ["scheduled", "completed"];
  //  joining a room

  const handleJoinClick = (roomId: string, bookingDate: string) => {
    const now = new Date();
    const bookingTime = new Date(bookingDate);
    const timeDifference = bookingTime.getTime() - now.getTime();

    if (timeDifference > 0) {
      const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (timeDifference > 5 * 60 * 1000) {
        setDialogState({
          isOpen: true,
          dialogType: "early",
          timeDetails: { hoursLeft, minutesLeft },
          roomId,
        });
        return;
      }
    } else {
      setDialogState({
        isOpen: true,
        dialogType: "past",
      });
      return;
    }
    navigate(`/meet/${roomId}`);
  };

  const handleClose = () => {
    setDialogState({
      isOpen: false,
      dialogType: null,
    });
  };

  const handleJoinAnyway = () => {
    if (dialogState.roomId) {
      navigate(`/meet/${dialogState.roomId}`);
    }
    handleClose();
  };
  return (
    <Container className="p-6 overflow-hidden mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">All Bookings</h1>
          <p className="text-sm text-gray-500">
            Showing {bookings?.length || 0} results
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {statuses.map((statusOption) => (
          <Button
            key={statusOption}
            variant={status === statusOption ? "default" : "outline"}
            onClick={() => setStatus(statusOption)}
            className="capitalize"
          >
            {statusOption}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="items-center flex justify-center h-32">
            <div className="rounded-full animate-spin h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          bookings?.map((booking) => (
            <div
              key={booking.id}
              className="border dark:bg-transparent rounded-lg p-6 bg-white overflow-x-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 hidden dark:bg-transparent bg-gray-100 rounded-lg sm:flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-medium">Booking Session</h3>
                    <p className="text-xs text-gray-500 tracking-wide">
                      {booking?.mentorId?.id === user?.id ? (
                        <>with: {booking.menteeId.name}</>
                      ) : (
                        <>tutor: {booking?.mentorId?.name}</>
                      )}
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      {formatDateAndCalculateTime(booking?.date)}
                    </p>
                    <div className="flex gap-2">
                      <span className="rounded-full px-3 py-1 text-sm bg-emerald-50 text-emerald-700">
                        Full-Time
                      </span>
                      <span className="rounded-full px-3 py-1 text-sm bg-orange-50 text-orange-700">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {booking.status === "scheduled" && (
                    <Button
                      onClick={() =>
                        handleJoinClick(booking.roomId, booking.date)
                      }
                      variant="outline"
                    >
                      Join
                    </Button>
                  )}
                  <p className="text-sm sm:block hidden text-gray-500">
                    Room ID:
                    <span className="font-mono">
                      {booking.roomId.slice(0, 8)}...
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && bookings?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No bookings found for this status.
          </div>
        )}
      </div>
      <DialogEarlyJoining
        isOpen={dialogState.isOpen}
        dialogType={dialogState.dialogType}
        timeDetails={dialogState.timeDetails}
        onClose={handleClose}
        onJoinAnyway={handleJoinAnyway}
      />
    </Container>
  );
};

export default BookingsPage;
