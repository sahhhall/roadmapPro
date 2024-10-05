import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppStore";
import useAuthRequest from "@/features/auth/hooks/useAuthRequest";
import { userRoutes } from "@/features/auth/services/endpoints";
import { verifyOtp } from "@/features/auth/api/auth";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  otp: z
    .string()
    .length(4, { message: "OTP must be 4 digits" })
    .regex(/^\d+$/, { message: "OTP must be numeric" }),
});

const Otp = ({ email }: { email: string }) => {
  const [timer, setTimer] = useState<number | any>(60);
  const [resendCount, setResendCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { doRequest, loading } = useAuthRequest({
    path: userRoutes.verifyOtp,
    method: "post",
    onSuccess: (response) => {
      dispatch(login(response.data.userVerified));
      navigate("/");
      toast({
        description: `Welcome ${response.data.userVerified.name}🎉.`,
      });
    },
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = async (data: { otp: string }) => {
    const response = await doRequest({
      otp: data.otp,
      email: email,
    });
    if (!response.success) {
      form.setError("otp", {
        type: "manual",
        message: response.error?.message,
      });
    }
  };
  const handleResendOtp = async () => {
    if (resendCount < 3) {
      try {
        setTimer(60);
        const response = await verifyOtp(email);
        setResendCount(resendCount + 1);
        console.log(response, "response");
      } catch (err) {
        toast({
          description: "internal server error try again later",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center">
      <Form {...form}>
        <h1 className="text-3xl text-center font-extrabold">OTP</h1>
        <p className="text-center mt-1 text-xs text-gray-500">
          Create an account to achieve new skills,
          <br /> and be part of our mentors.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  flex flex-col items-center   mt-6"
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormMessage className="w-max[10px] text-xs" />
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className=" w-100">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          {timer > 0 ? (
            <Button variant={"submit"} type="submit" className="w-full">
              {loading ? loading : "Submit OTP"}
            </Button>
          ) : (
            <Button
              disabled
              variant={"submit"}
              type="submit"
              className="w-full cursor-not-allowed"
            >
              Submit OTP
            </Button>
          )}
        </form>
      </Form>
      <p className="mt-4 text-xs">
        {resendCount !== 3 && `Time remaining: ${timer} seconds`}
      </p>
      {resendCount < 3 ? (
        <Button
          onClick={handleResendOtp}
          className="underline text-blue-400 text-xs"
          disabled={timer > 0}
        >
          Resend OTP {resendCount > 0 && `(${3 - resendCount} attempts left)`}
        </Button>
      ) : (
        <p className="text-xs text-red-500">
          You have reached the maximum number of resend attempts.
        </p>
      )}
    </div>
  );
};

export default Otp;
