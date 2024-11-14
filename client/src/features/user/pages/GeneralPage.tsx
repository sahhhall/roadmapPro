import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import AvailabilityModal from "@/features/mentor/components/modals/AvalibilityModal";
import { usegetUser } from "@/hooks/usegetUser";
import { LinkedinIcon, Pen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetUserDetailsQuery,
  useUpdateMentorProfileMutation,
  useUpdateUserDetailsMutation,
} from "@/features/user/services/api/mentorTestApi";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const avatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file: File) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

const headlineSchema = z
  .string()
  .min(10, "Headline must be at least 10 characters")
  .max(100, "Headline must not exceed 100 characters")
  .refine((val) => val.trim().length > 0, "Professional headline is required");

const experienceSchema = z
  .number()
  .positive("Experience must be a positive number.")
  .int("Experience must be a whole number.")
  .min(1, "Experience must be at least 1 year.")
  .max(50, "Experience cannot exceed 50 years.");

const bioSchema = z
  .string()
  .min(50, "Bio must be at least 50 characters")
  .max(1000, "Bio must not exceed 1000 characters")
  .refine((val) => val.trim().length > 0, "Bio is required");

const nameSchema = z
  .string()
  .min(3, {
    message: "Name must be at least 3 characters long",
  })
  .max(10, {
    message: "Name should be under 10 characters",
  })
  .regex(/^[a-zA-Z]+$/, {
    message: "Username must only contain  alphabets",
  });

const GeneralPage = () => {
  const { toast } = useToast();
  const [availibilityDialogOpen, setAvailibilityDialogOpen] =
    useState<boolean>(false);
  // with help of this we find which one currently selected for editing and we render conditionly
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedAvatar, setUpdatedAvatar] = useState<string | null>(null);

  const user = usegetUser();
  //it for trigger input file
  const inputFileRef = useRef<HTMLInputElement>(null);

  const {
    data: profileData,
    isLoading: ProfileDataLoadingApi,
    refetch: refetchProfile,
  } = useGetUserDetailsQuery(user?.id!);

  const [updateGenericProfileData] = useUpdateUserDetailsMutation();
  const [updateMentorData] = useUpdateMentorProfileMutation();

  // for controledd form
  const [formData, setFormData] = useState({
    name: profileData?.name || profileData?.userId?.name || "",
    headline: profileData?.headline || "",
    bio: profileData?.bio || "",
    expirience: profileData?.expirience || "",
  });

  const [formErrors, setFormErrors] = useState({
    headline: "",
    expirience: "",
    bio: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //when click any other outside while editing this will trigger
  const handleBlurOn = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));

    //should refactor later
    setFormData({
      name: profileData?.name || profileData?.userId?.name || "",
      headline: profileData?.headline || "",
      bio: profileData?.bio || "",
      expirience: profileData?.expirience || "",
    });
    setEditingField(null);
  };

  if (ProfileDataLoadingApi) {
    <>Loading</>;
  }

  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    try {
      form.setValue("avatar", file as any);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUpdatedAvatar(reader.result as string);
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid file";
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to process the image",
          variant: "destructive",
        });
      }
    }
  };

  const openavailibilityDialog = () => setAvailibilityDialogOpen(true);

  //mentro specfic

  const handleSaveAdditionalInfo = async (fieldName: string, value: string) => {
    // First check if the value has actually changed
    const currentValue = profileData?.[fieldName as keyof typeof profileData];
    const isSameValue = String(currentValue) === String(value);
    //if it is smae value dont need api call
    if (isSameValue) {
      setEditingField(null);
      return;
    }

    try {
      let validationResult: any;
      switch (fieldName) {
        case "headline":
          validationResult = headlineSchema.safeParse(value);
          break;
        case "expirience":
          validationResult = experienceSchema.safeParse(Number(value));
          break;
        case "bio":
          validationResult = bioSchema.safeParse(value);
          break;
      }

      if (!validationResult?.success) {
        setFormErrors((prev) => ({
          ...prev,
          [fieldName]: validationResult?.error?.errors[0].message || "",
        }));
        return;
      }
      setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));

      const updatedData = { [fieldName]: value };
      await updateMentorData({
        mentorId: user!.id,
        updatedData,
      }).unwrap();

      toast({
        title: "Success",
        description: "Your profile information has been updated successfully.",
      });

      //refetch profile data
      refetchProfile();
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors[0] ||
        "An unexpected error occurred. Please try again later.";
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
    setEditingField(null);
  };
  const handleSaveBasicProfile = async (
    fieldName: string,
    value: string | File
  ) => {
    try {
      const formData = new FormData();

      if (fieldName === "name") {
        const res = nameSchema.safeParse(value);
        if (!res?.success) {
          toast({
            title: "Error",
            description: `${res?.error?.errors[0].message}`,
          });
          return;
        }
        formData.append("name", value);
      }

      if (updatedAvatar) {
        console.log(form.getValues("avatar"));
        formData.append("avatar", form.getValues("avatar"));
      }

      await updateGenericProfileData(formData as any);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      refetchProfile();
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors[0] ||
        "An unexpected error occurred. Please try again later.";
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    } finally {
      if (fieldName === "avatar") {
        setUpdatedAvatar(null);
        if (inputFileRef && inputFileRef.current)
          inputFileRef.current.value = "";
      }
      setEditingField(null);
    }
  };
  useEffect(() => {
    refetchProfile();
  }, []);
  return (
    <Container className="">
      {/* div for contenet like profile and user name and headlin  */}
      <div className="w-full border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black  rounded-lg ">
        <div className="w-full h-48 sm:h-64 rounded-t-lg relative">
          <div className="absolute inset-0  rounded-t-lg">
            <img
              src={
                updatedAvatar ||
                profileData?.avatar ||
                profileData?.userId?.avatar ||
                "https://github.com/shadcn.png"
              }
              alt="cover"
              className="w-full h-full object-cover rounded-t-lg opacity-20"
            />
          </div>
          <div className="absolute right-3 -bottom-6 ">
            <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
          </div>
          <div className="absolute -bottom-12 left-6">
            <div
              className="w-21 h-21 sm:w-31 sm:h-31 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white cursor-pointer relative group"
              onClick={() => {
                inputFileRef.current?.click();
              }}
            >
              <img
                src={
                  updatedAvatar ||
                  profileData?.avatar ||
                  profileData?.userId?.avatar ||
                  "https://github.com/shadcn.png"
                }
                alt="profile"
                className={` ${
                  updatedAvatar ? " animate-pulse " : ""
                } w-20 h-20 object-cover `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Pen className="w-6 h-6 text-white" />
              </div>
            </div>
            <input
              ref={inputFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          {updatedAvatar && (
            <div className="absolute bottom-0 flex justify-end w-full px-6 space-x-2 pb-4">
              <Button
                onClick={() => handleSaveBasicProfile("avatar", updatedAvatar)}
                className="border bg-black text-white hover:bg-gray-900 rounded-sm text-xs px-3"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setUpdatedAvatar(null);
                  if (inputFileRef && inputFileRef!.current)
                    inputFileRef.current.value = "";
                }}
                className="border bg-white text-black hover:bg-gray-100 rounded-sm text-xs px-3"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="pb-9 pt-16  px-6">
          <div className="space-y-4">
            <div>
              {editingField === "name" ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlurOn("name")}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleSaveBasicProfile("name", formData.name)
                  }
                  className="text-2xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-2xl font-bold flex items-center gap-2 group cursor-pointer"
                  onClick={() => setEditingField("name")}
                >
                  {profileData?.name || profileData?.userId?.name}
                  <Pen className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h1>
              )}
              <p className="text-gray-600 text-xs dark:text-gray-400">
                {profileData?.email || profileData?.userId.email}
              </p>
              {user?.role === "mentor" && (
                <>
                  <div className="relative">
                    {editingField === "headline" ? (
                      <input
                        type="text"
                        name="headline"
                        onBlur={() => handleBlurOn("headline")}
                        value={formData.headline}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleSaveAdditionalInfo(
                            "headline",
                            formData.headline
                          )
                        }
                        className="w-full text-gray-600 text-xs dark:text-gray-400 bg-transparent border-b focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <p
                        className="text-gray-600 text-xs dark:text-gray-400 group cursor-pointer"
                        onClick={() => setEditingField("headline")}
                      >
                        {profileData?.headline}
                        <Pen className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                      </p>
                    )}
                    {formErrors.headline && (
                      <p className="text-red-500 text-xs">
                        {formErrors.headline}
                      </p>
                    )}
                  </div>

                  {/* expirience field  */}
                  <div className="relative">
                    {editingField === "expirience" ? (
                      <input
                        type="number"
                        name="expirience"
                        onBlur={() => handleBlurOn("expirience")}
                        value={formData.expirience}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleSaveAdditionalInfo(
                            "expirience",
                            formData.expirience
                          )
                        }
                        className="w-full text-gray-600 text-xs dark:text-gray-400 bg-transparent border-b focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <p
                        className="text-gray-600 text-xs dark:text-gray-400 group cursor-pointer"
                        onClick={() => setEditingField("expirience")}
                      >
                        {profileData?.expirience}+ years experience
                        <Pen className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                      </p>
                    )}
                    {formErrors.expirience && (
                      <p className="text-red-500 text-xs">
                        {formErrors.expirience}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* div for about (in db bio)  */}
      {user?.role === "mentor" && (
        <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black  rounded-lg">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">About</h2>
              {editingField === "bio" ? (
                <textarea
                  name="bio"
                  onBlur={() => handleBlurOn("bio")}
                  onChange={handleInputChange}
                  value={formData.bio}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleSaveAdditionalInfo("bio", formData.bio)
                  }
                  className="w-full bg-transparent border dark:text-gray-400  text-gray-600 text-sm  rounded-md p-2 focus:outline-none focus:border-blue-500"
                  rows={4}
                  autoFocus
                />
              ) : (
                <p
                  className="text-gray-600 text-sm group dark:text-gray-400  cursor-pointer"
                  onClick={() => setEditingField("bio")}
                >
                  {profileData?.bio}
                  <Pen className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                </p>
              )}
              {formErrors.bio && (
                <p className="text-red-500 text-xs">{formErrors.bio}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold mb-2">
                Languages That I Speak
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData?.languages.map((language: string) => (
                  <span className="text-xs px-2 py-1 dark:border dark:bg-transparent bg-gray-100 rounded-md">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* for mentors specific skill they achived  */}
      {user?.role === "mentor" && (
        <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black rounded-lg">
          <div className=" p-3 flex-wrap items-center space-x-2   ">
            {profileData?.assessedSkills.map((skill: string) => (
              <span
                key={skill}
                className="px-2 py-1 dark:bg-transparent dark:border bg-blue-50 text-blue-700 rounded-md text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {user?.role === "mentor" && (
        <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black rounded-lg">
          <div className=" p-3 flex-wrap items-center space-x-2   ">
            <Button
              onClick={openavailibilityDialog}
              className="w-full border-blue-100"
              variant={"outline"}
            >
              Manage Availability
            </Button>
          </div>
        </div>
      )}
      <AvailabilityModal
        setDialogOpen={setAvailibilityDialogOpen}
        dialogOpen={availibilityDialogOpen}
      />
    </Container>
  );
};

export default GeneralPage;
