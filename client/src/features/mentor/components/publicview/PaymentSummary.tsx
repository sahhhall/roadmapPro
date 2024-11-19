import React, { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { IMentorDetailsResponse } from "@/features/user/types/mentor";
import { useCreatePaymentMutation } from "../../services/api/mentorApi";
import {
  ICreatePaymentRequest,
  IGetMenotrsBookingsResponse,
} from "../../types/mentor";

const publishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishKey);

interface PaymentSummaryProps {
  price: number;
  mentorDetails: IMentorDetailsResponse | undefined;
  bookingDetails: IGetMenotrsBookingsResponse;
  bookingDate: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = React.memo(({
  price,
  mentorDetails,
  bookingDetails,
  bookingDate,
}) => {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const paymentData = useMemo<ICreatePaymentRequest>(() => ({
    mentorId: mentorDetails?.userId._id as string,
    price: price,
    name: mentorDetails?.userId.name as any,
    bookingId: bookingDetails.id,
    userId: bookingDetails.menteeId,
    bookingDate: bookingDate
  }), [mentorDetails?.userId._id, mentorDetails?.userId.name, price, bookingDetails.id, bookingDetails.menteeId, bookingDate]);

  const handlePayment = useCallback(async () => {
    try {
      const result = await createPayment(paymentData).unwrap();
      const { id } = result;
      const stripe = await stripePromise;
      if (stripe && id) {
        stripe.redirectToCheckout({ sessionId: id });
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }, [createPayment, paymentData]);

  
  const buttonText = useMemo(() => 
    isLoading ? "Processing..." : "Proceed to Pay",
    [isLoading]
  );

  return (
    <Card className="w-full h-full shadow-none">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
        <CardDescription>
          Review your booking details and complete the payment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="w-full items-center gap-4">
            <div className="space-y-2">
              <h3 className="text-md font-semibold text-gray-800">
                Payment Instructions
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>
                  Ensure you have a stable internet connection for a smooth
                  payment experience.
                </li>
                <li>
                  Verify the total price and details before proceeding to pay.
                </li>
                <li>
                  Choose your preferred payment method on the next screen.
                </li>
                <li>
                  For any issues, contact support using the help button in the
                  top right corner.
                </li>
              </ul>
            </div>
            <div className="flex mt-8 flex-row justify-between space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Total Price
              </label>
              <p className="text-lg font-semibold items-center flex">
                <IndianRupee className="w-4 h-4" />
                {price}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full">
        <Button
          variant="submit"
          className="w-full"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {buttonText} &nbsp;
          <IndianRupee className="w-3 h-3" />
        </Button>
      </CardFooter>
    </Card>
  );
});

