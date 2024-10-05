import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Eye as ShowPasswordIcon,
  EyeOff as HidePasswordIcon,
} from "lucide-react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
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
import { adminLogin } from "@/features/admin/services/api/auth";
import { useAppDispatch } from "@/hooks/useAppStore";
import { useToast } from "@/hooks/use-toast";
import { adminAuth } from "@/redux/slices/adminSlice";
export const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await adminLogin(values);
      if (response.success && response.data) {
        dispatch(adminAuth());
        navigate("/admin");
        toast({
          title: "Login Successful",
          description: "Welcome back, admin!",
        });
      } else {
        const errorMessage =
          response.error?.[0]?.message || "Login failed. Please try again.";
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password filed  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative ">
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <div className="relative ">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
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
        <Button size={"submit"} variant={"submit"} type="submit">
          Submit
        </Button>

        <Button
          className="dark:text-white w-full     border   rounded-md  text-black text-center"
          type="submit"
        >
          <span className="text-xs text-gray-500">Want login as user?</span>
          <Link className="ps-1 text-xs  text-blue-700" to={"/login"}>
            Continue
          </Link>
        </Button>
        <p className=" max-w-[22rem] text-xs font-thin  dark:text-gray-500">
          By continuing to use our services, you acknowledge that you have both
          read and agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Form>
  );
};
