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
export const PaymentSummary = ({ price }: { price: number }) => (
  <Card className="w-full  h-full shadow-none">
    <CardHeader>
      <CardTitle>Booking Summary</CardTitle>
      <CardDescription>
        Review your booking details and complete the payment.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div>
        <div className="  w-full  items-center gap-4">
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
              <li>Choose your preferred payment method on the next screen.</li>
              <li>
                For any issues, contact support using the help button in the top
                right corner.
              </li>
            </ul>
          </div>
          <div className="flex  mt-8 flex-row justify-between space-y-1.5">
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
      <Button variant={"submit"} className="w-full">
        Proceed to Pay &nbsp; <IndianRupee className="w-3 h-3" />
        444
      </Button>
    </CardFooter>
  </Card>
);
