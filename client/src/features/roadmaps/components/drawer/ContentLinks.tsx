import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, CircleX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { setFormData } from "@/redux/slices/roadMapslice";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(6, { message: "Description must be at least 6 characters" }),
  links: z
    .array(
      z.object({
        title: z.string().min(1, { message: "required" }),
        url: z.string().min(1, { message: "required" }),
      })
    )
    .max(2, { message: "Maximum of 2 links allowed" }),
});

const ContentForm = ({
  nodeId,
  setIsSheetOpen,
}: {
  nodeId: string | null;
  setIsSheetOpen: (isOpen: boolean) => void; 
}) => {
  const dispatch = useAppDispatch();
  const roadmap = useAppSelector((state) =>
    state.roadMap.nodes.find((node) => {
      return node.nodeId === nodeId;
    })
  );
  // const r = useAppSelector((state)=> state.roadMap);
  // console.log(r,"fasdfsdklj")

  const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: roadmap,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    dispatch(setFormData({ ...values, nodeId: nodeId }));
    setIsSheetOpen(false);
    toast({
      description: (
        <>
          <CircleCheck color="green" className="inline-block mr-2" />
          content saved!
        </>
      ),
      className: "border-none",
      variant: "default",
      
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
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
                <Textarea
                  placeholder="Enter description (min 6 characters)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((item, index) => (
          <Card key={item.id}>
            <CardContent className=" relative">
              <div className=" space-y-5">
                <Button
                  className="right-2 top-0 absolute"
                  onClick={() => remove(index)}
                >
                  <CircleX />
                </Button>
                <FormField
                  control={form.control}
                  name={`links.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Enter link title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`links.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Enter URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append({ title: "", url: "" })}
          disabled={fields.length >= 2}
        >
          Add Link {fields.length}/2
        </Button>

        <Button variant={'submit'} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContentForm;
