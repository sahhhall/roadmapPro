import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Eye as ShowPasswordIcon,
  EyeOff as HidePasswordIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthRequest from "@/features/auth/hooks/useAuthRequest";
import { userRoutes } from "@/features/auth/services/endpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
        message: "enter strong password",
      }),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords must match",
    path: ["newPasswordConfirm"],
  });
const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const email = searchParams.get("email");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { doRequest, loading } = useAuthRequest({
    path: userRoutes.resetpassword,
    method: "patch",
    onSuccess: () => {
      navigate("/");
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(email);
    const response = await doRequest({
      newPassword: values.newPassword,
      token,
      email,
    });
    if (!response.success) {
      if (response.error?.status === 400) {
        toast({
          variant: "destructive",
          title: `${response.error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } else {
      toast({
        variant: "default",
        title: "Success!",
        description: "Password reset successfully.",
      });
    }
  };
  return (
    <Form {...form}>
      <form className=" space-y-3 " onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xs">New Password</FormLabel>
              <FormControl>
                <div className="relative ">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <div
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <HidePasswordIcon size={20} />
                    ) : (
                      <ShowPasswordIcon size={20} />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Confirm password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-5"
          size={"submit"}
          variant={"submit"}
          type="submit"
        >
          {loading ? loading : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
