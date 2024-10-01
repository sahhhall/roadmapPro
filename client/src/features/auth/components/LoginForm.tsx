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
  FormMessage   ,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export const ProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <div>
          <Link
            to={"/forgot-password"}
            className="ps-1   text-xs text-blue-700 dark:text-blue-300"
          >
            forgot your password?
          </Link>
        </div>

        <Button size={"submit"} variant={"submit"} type="submit">
          Submit
        </Button>
       
        <Button
          className="dark:text-white w-full     border   rounded-md  text-black text-center"
          type="submit"
        >
          <span className="text-xs text-gray-500">Don't have an account?</span>
          <Link className="ps-1 text-xs  text-blue-700" to={"/signup"}>
            Sign up
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
