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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetAllAvalibleStacksQuery,
  useRegisterTestMutation,
} from "@/features/user/services/api/mentorTestApi";
import { CircleCheck, Github, Linkedin, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  stackId: z
    .string({
      required_error: "Please select a stack domain",
    })
    .min(1, "Stack domain is required"),
  expirience: z
    .string({
      required_error: "Please select your experience level",
    })
    .min(1, "Experience level is required"),
  languages: z
    .array(z.string())
    .nonempty({ message: "Please select at least one language." }),
  headline: z
    .string()
    .min(10, "Headline must be at least 10 characters")
    .max(100, "Headline must not exceed 100 characters")
    .refine(
      (val) => val.trim().length > 0,
      "Professional headline is required"
    ),
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must not exceed 500 characters")
    .refine((val) => val.trim().length > 0, "Bio is required"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .min(1, "LinkedIn URL is required")
    .refine((val) => val.includes("linkedin.com"), "Must be a LinkedIn URL"),
  githubUrl: z
    .string()
    .url("Please enter a valid Github URL")
    .min(1, "github URL is required")
    .refine((val) => val.includes("github.com"), "Must be a LinkedIn URL"),
});

type FormData = z.infer<typeof formSchema>;

const experienceOptions = [
  { value: "1", label: "1+ year" },
  { value: "2", label: "2+ years" },
  { value: "3", label: "3+ years" },
  { value: "5", label: "5+ years" },
  { value: "7", label: "7+ years" },
  { value: "10", label: "10+ years" },
];

const languageOptions = [
  { value: "english" },
  { value: "hindi" },
  { value: "malayalam" },
  { value: "tamil" },
  { value: "spanish" },
  { value: "french" },
  { value: "german" },
];

export const MentorDetailsSubmissionForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stackId: "",
      expirience: "",
      headline: "",
      bio: "",
      linkedinUrl: "",
      languages: [],
    },
  });

  const navigate = useNavigate();

  const { toast } = useToast();

  const { data: stacks, isLoading, error } = useGetAllAvalibleStacksQuery({});
  const [registerTest, { isLoading: isUpdating }] = useRegisterTestMutation({});

  const handleSubmit = async (data: FormData) => {
    console.log(data, "data");
    try {
      const response = await registerTest(data).unwrap();
      toast({
        description: (
          <>
            <CircleCheck color="green" className="inline-block mr-2" />
            Registered successfully!
          </>
        ),
        className: "border-none",
        variant: "default",
      });
      navigate(`/assessment/${response.id}`, {
        state: { testData: response },
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `${
          error.status === 404
            ? "For this stack currently no tests"
            : "Uh oh! Something went wrong."
        }`,
      });
      console.log(error, "error");
    }
  };

  //here i used this for push into array
  const handleLanguageChange = (value: string) => {
    let currentvalues = form.getValues("languages");
    if (!currentvalues.includes(value)) {
      const updated = [...currentvalues, value] as any;
      form.setValue("languages", updated, { shouldValidate: true });
    }
    console.log(form.getValues("languages"));
  };

  //for removeing selected langueas so used filtere for that

  const handleRemoveLanguage = (language: string) => {
    const currentValues = form.getValues("languages");
    const updatedLanguages = currentValues.filter(
      (val) => language !== val
    ) as any;
    form.setValue("languages", updatedLanguages, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="stackId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Stack Domain
                </FormLabel>
                {isLoading ? (
                  <p className="text-sm text-gray-500">Loading stacks...</p>
                ) : error ? (
                  <p className="text-sm text-red-500">Error loading stacks.</p>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a stack domain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stacks?.map((stack) => (
                        <SelectItem key={stack.id} value={stack.id}>
                          {stack.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expirience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Experience Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Professional Headline
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Senior Frontend Developer at Tech Corp"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="languages"
          render={({}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Preferred Language
              </FormLabel>
              <Select onValueChange={handleLanguageChange}>
                <FormControl>
                  <SelectTrigger>Select language</SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {form.getValues("languages").map((val) => (
            <span
              key={val}
              className=" items-center text-xs  inline-flex gap-x-8 p-1 border border-1 border-gray-300 rounded-md"
            >
              {val}
              <button
                type="button"
                onClick={() => handleRemoveLanguage(val)}
                className="text-black-500 hover:text-gray-700"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience and what you can offer as a mentor..."
                  className="min-h-32 w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full  relative">
                    <Linkedin
                      size={19}
                      className="absolute top-2 left-4 "
                      color="black"
                    />
                    <Input
                      placeholder="https://linkedin.com/in/your-profile"
                      type="url"
                      {...field}
                      className=" ps-9  ms-2 w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full  relative">
                    <Github
                      className="absolute top-2 left-2  "
                      size={20}
                      color="black"
                    />
                    <Input
                      placeholder="https://linkedin.com/in/your-profile"
                      type="url"
                      {...field}
                      className="ps-9 w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full" variant={"submit"}>
            {isUpdating ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MentorDetailsSubmissionForm;
