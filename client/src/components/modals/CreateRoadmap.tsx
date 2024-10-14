import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";

interface CreateRoadmapProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const formSchema = z.object({
  title: z
    .string()
    .min(6, { message: "At least 6 characters needed" })
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const closeDialog = () => {
    form.reset();
    form.clearErrors();
    setDialogOpen(false);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    closeDialog();
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
                  <FormItem >
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input  placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6 w-full grow">
              <Button type="submit" variant="submit" className="w-full">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoadmap;
