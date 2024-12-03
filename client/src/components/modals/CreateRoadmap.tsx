import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { usegetUser } from "@/hooks/usegetUser";
import { useCreateRoadmapMutation } from "@/features/roadmaps/services/api/roadmapApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

interface CreateRoadmapProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "At least 6 characters needed" })
    .refine((value) => value.trim().length > 0, {
      message: "Title cannot contain only whitespace",
    })
    .refine((value) => !/^\d+$/.test(value), {
      message: "Title cannot contain only numbers",
    }),

  description: z
    .string()
    .min(10, { message: "At least 10 characters needed" })
    .refine((value) => value.trim().length > 0, {
      message: "Description cannot contain only whitespace",
    })
    .refine((value) => !/^\d+$/.test(value), {
      message: "Description cannot contain only numbers",
    }),
});

const CreateRoadmap: React.FC<CreateRoadmapProps> = ({
  dialogOpen,
  setDialogOpen,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const closeDialog = () => {
    form.reset();
    form.clearErrors();
    setDialogOpen(false);
  };
  const userData = usegetUser();
  const [createRoadmap, { isLoading }] = useCreateRoadmapMutation({});

  useEffect(() => {
    const checkMobileScreen = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobileScreen();
    window.addEventListener("resize", checkMobileScreen);
    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isMobile) {
      toast({
        title: "Better Experience on Laptop",
        description: "For a better experience, we recommend using a laptop and try to do with laptop.",
        action: (
          <ToastAction altText="Ok" onClick={() => {closeDialog()}}>
            Ok
          </ToastAction>
        ),
        variant: "default",
      });
      return
    }
    if (!userData) {
      toast({
        title: "Uh oh! You are not logged in.",
        description: "Login to continue.",
        action: (
          <ToastAction altText="Login" onClick={() => navigate("/login")}>
            Login
          </ToastAction>
        ),
      });
      return;
    }
    const payload = {
      title: values.title,
      description: values.description,
      userId: userData?.id,
    };
    try {
      const result = await createRoadmap(payload).unwrap();
      toast({
        description: (
          <>
            <CircleCheck color="green" className="inline-block mr-2" />
            Roadmap created successfully!
          </>
        ),
        className: "border-none",
        variant: "default",
      });
      navigate(`/draw-roadmap/${result.id}`);
      closeDialog();
    } catch (error) {
      console.error("Error creating roadmap:", error);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (!open) closeDialog();
        setDialogOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Create Roadmap</DialogTitle>
          <DialogDescription>
            Add a title and description to your roadmap.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6 w-full grow">
              {isLoading ? (
                <Button type="submit" variant="submit" className="w-full ">
                  <LoaderCircle className="animate-spin " />
                </Button>
              ) : (
                <Button type="submit" variant="submit" className="w-full">
                  Submit
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoadmap;
