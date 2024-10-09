import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAuthRequest from "@/features/auth/hooks/useAuthRequest";
import { userRoutes } from "@/features/auth/services/endpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
});

const ForgotPassowrdForm = () => {
  const [checkText, setcheckText] = useState<boolean>(false);
  const { toast } = useToast();
  const { doRequest, loading } = useAuthRequest({
    path: userRoutes.forgotpassword,
    method: "post",
    onSuccess: () => {
      setcheckText(true);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("emai", values);
    const response = await doRequest(values);
    if (!response.success) {
      if (response.error?.status === 404) {
        form.setError("email", {
          message: "Email address not found. Please check and try again",
        });
      } else if (response.error?.status === 403) {
        toast({
          variant: "destructive",
          title: "Uh oh! You are blocked from site.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {checkText && (
          <div className="w-full mt-4 h-6 rounded-sm bg-lime-100 text-center items-center flex justify-center">
            <p className="text-xs text-lime-700 ">
              Check your email for a link to reset your password.
            </p>
          </div>
        )}

        <Button
          className="mt-3"
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

export default ForgotPassowrdForm;
