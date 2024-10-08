import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Eye as ShowPasswordIcon,
  EyeOff as HidePasswordIcon,
} from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useAuthRequest from "@/features/auth/hooks/useAuthRequest";
import { userRoutes } from "@/features/auth/services/endpoints";
import { useToast } from "@/hooks/use-toast";

export const formSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long",
      })
      .max(10, {
        message: "Name should be under 10 characters",
      })
      .regex(/^[a-zA-Z]+$/, {
        message: "Username must only contain  alphabets",
      }),
    email: z.string().email({
      message: "Email must be valid",
    }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
        message: "enter strong password",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const SignupForm = ({ setShowOtppage }: any) => {
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPasswordshow, setShowconfirmPassword] = useState(true);
  const { doRequest, loading } = useAuthRequest({
    path: userRoutes.signup,
    method: "post",
    onSuccess: (response) =>
      setShowOtppage({
        show: true,
        email: response.data.email,
      }),
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await doRequest(values);
    if (response.success) {
    } else {
      if (response.error?.status === 409 && !response.success) {
        form.setError("email", {
          type: "manual",
          message: "User already exists with this email",
        });
      } else {
        toast({
          description: "internal server error try again later",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      {/* chage should be here to resize to small that fit screen  */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    type={confirmPasswordshow ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={() =>
                      setShowconfirmPassword(!setShowconfirmPassword)
                    }
                  >
                    {confirmPasswordshow ? (
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
        <p className="max-w-[22rem] text-xs font-thin dark:text-white-500">
          Password must contain at least one uppercase letter, one number, and
          can include special characters
        </p>

        <Button
          className={`${loading && "opacity-50 cursor-not-allowed "}}`}
          size={"submit"}
          variant={"submit"}
          type="submit"
        >
          {loading ? loading : "Submit"}
        </Button>

        <Button
          className="dark:text-white w-full border rounded-md text-black text-center"
          type="button"
        >
          <span className="text-xs text-gray-500">
            Already have an account?
          </span>
          <Link className="ps-1 text-xs text-blue-700" to={"/login"}>
            Sign in
          </Link>
        </Button>

        <p className="max-w-[22rem] text-xs font-thin dark:text-gray-500">
          By continuing to use our services, you acknowledge that you have both
          read and agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
