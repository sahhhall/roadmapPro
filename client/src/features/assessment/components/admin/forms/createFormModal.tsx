import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useCreateQuestionMutation } from "@/features/assessment/services/api/assessementApi";

const formSchema = z.object({
  question: z
    .string()
    .min(10, "Question must be at least 10 characters")
    .max(500, "Question must not exceed 500 characters")
    .refine((val) => val.trim().length > 0, "Question is required"),
  options: z
    .array(
      z
        .string()
        .min(1, "Option must not be empty")
        .max(200, "Option must not exceed 200 characters")
    )
    .length(4, "Exactly 4 options are required")
    .refine((options) => new Set(options).size === options.length, {
      message: "all options must be unique",
    }),
  correctAnswer: z.string().min(1, "Please select the correct answer"),
});

type FormData = z.infer<typeof formSchema>;

const QuestionCreationForm = ({
  refetchQuestions,
  onSubmitSuccess,
}: {
  refetchQuestions: () => any;
  onSubmitSuccess: () => void;
}) => {
  const { id } = useParams();
  const { toast } = useToast();

  //APIhooks

  const [createQuestion] = useCreateQuestionMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    //this for getting correct option text that admin selectino
    const selectedOptionIndex = data.correctAnswer as any;
    const selectedOptionText = data.options[selectedOptionIndex];

    const formattedData = {
      ...data,
      stackId: id as string,
      correctAnswer: selectedOptionText as string,
    };
    try {
      console.log("Form data:", formattedData);
      await createQuestion(formattedData);
      toast({
        title: "Success!",
        description: "Question created successfully",
      });
      refetchQuestions();
      onSubmitSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while creating the question",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Question
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your question here..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-sm font-medium text-gray-700">
            Options
          </FormLabel>

          <RadioGroup
            onValueChange={(value) => form.setValue("correctAnswer", value)}
            className="space-y-4"
          >
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center space-x-4">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <FormField
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </RadioGroup>

          <FormField
            control={form.control}
            name="correctAnswer"
            render={({}) => (
              <FormItem>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <AlertDialogFooter className="pt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" variant="submit">
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin  " />
                Creating Question
              </>
            ) : (
              "Create Question"
            )}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default QuestionCreationForm;
