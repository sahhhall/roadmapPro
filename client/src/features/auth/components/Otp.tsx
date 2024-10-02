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

const formSchema = z.object({
  otp: z.string(),
  // .length(4, { message: "OTP must be 4 digits" })
  // .regex(/^\d+$/, { message: "OTP must be numeric" }),
});

const Otp = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: { otp: string }) => {
    console.log("OTP Submitted: ", data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <h1 className="text-3xl text-center font-extrabold">Signup</h1>
        <p className="text-center mt-1 text-xs text-gray-500">
          Create an account to achieve new skills,
          <br /> and be part of our mentors.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"submit"} type="submit" className="w-full">
            Submit OTP
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Otp;
