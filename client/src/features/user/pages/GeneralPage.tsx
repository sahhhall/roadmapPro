import Container from "@/components/Container";
import { EditableField } from "../components/general/EditableField";
import { ProfileHeader } from "../components/general/ProfileHeader";
import { AboutSection } from "../components/general/AboutSection";
import { LanguagesSection } from "../components/general/LanguagesSection";
import { SkillsSection } from "../components/general/SkillsSection";
import { AvailabilitySection } from "../components/general/AvailabilitySection";
import AvailabilityModal from "@/features/mentor/components/modals/AvalibilityModal";
import {
  avatarSchema,
  bioSchema,
  experienceSchema,
  headlineSchema,
  nameSchema,
} from "../types/validation-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import {
  useGetUserDetailsQuery,
  useUpdateMentorProfileMutation,
  useUpdateUserDetailsMutation,
} from "../services/api/mentorTestApi";
import { usegetUser } from "@/hooks/usegetUser";
import { useToast } from "@/hooks/use-toast";
import { FormDataa, FormErrors } from "../types/general";

const GeneralPage = () => {
  const { toast } = useToast();
  const [availibilityDialogOpen, setAvailibilityDialogOpen] =
    useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedAvatar, setUpdatedAvatar] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const user = usegetUser();

  const {
    data: profileData,
    isLoading: ProfileDataLoadingApi,
    refetch: refetchProfile,
  } = useGetUserDetailsQuery(user?.id!);

  const [updateGenericProfileData, { isLoading: photoSubmitLoading }] =
    useUpdateUserDetailsMutation();
  const [updateMentorData] = useUpdateMentorProfileMutation();

  const [formData, setFormData] = useState<FormDataa>({
    name: "",
    headline: "",
    bio: "",
    expirience: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    headline: "",
    expirience: "",
    bio: "",
  });

  useEffect(() => {
    refetchProfile();
  }, []);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData?.name || profileData?.userId?.name || "",
        headline: profileData?.headline || "",
        bio: profileData?.bio || "",
        expirience: profileData?.expirience || "",
      });
    }
  }, [profileData]);

  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: undefined,
    },
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

  const handleBlurOn = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData({
      name: profileData?.name || profileData?.userId?.name || "",
      headline: profileData?.headline || "",
      bio: profileData?.bio || "",
      expirience: profileData?.expirience || "",
    });
    setEditingField(null);
  };

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

  const handleSaveBasicProfile = async (
    fieldName: string,
    value: string | File
  ) => {
    try {
      const formData = new FormData();
      formData.append("userId", user!.id);

      if (fieldName === "name") {
        const res = nameSchema.safeParse(value);
        if (!res?.success) {
          toast({
            title: "Error",
            description: `${res?.error?.errors[0].message}`,
          });
          return;
        }
        formData.append("name", value as string);
      }

      if (updatedAvatar && fieldName === "avatar") {
        formData.append("avatar", form.getValues("avatar"));
      }

      await updateGenericProfileData(formData as any);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      await refetchProfile();
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
        if (inputFileRef.current) inputFileRef.current.value = "";
      }
      setEditingField(null);
      setUpdatedAvatar(null);
    }
  };

  const handleSaveAdditionalInfo = async (fieldName: string, value: string) => {
    const currentValue = profileData?.[fieldName as keyof typeof profileData];
    const isSameValue = String(currentValue) === String(value);

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

      await updateMentorData({
        mentorId: user!.id,
        updatedData: { [fieldName]: value },
      }).unwrap();
      await refetchProfile();
      toast({
        title: "Success",
        description: "Your profile information has been updated successfully.",
      });
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

  if (ProfileDataLoadingApi) {
    return <div>Loading...</div>;
  }
  console.log(profileData, "proifle");

  return (
    <Container className="">
      <div className="w-full border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black rounded-lg">
        <ProfileHeader
          profileData={profileData}
          updatedAvatar={updatedAvatar}
          photoSubmitLoading={photoSubmitLoading}
          handleAvatarUpload={handleAvatarUpload}
          handleSaveBasicProfile={handleSaveBasicProfile}
          inputFileRef={inputFileRef}
          setUpdatedAvatar={setUpdatedAvatar}
        />

        <div className="pb-9 pt-16 px-6">
          <div className="">
            <EditableField
              fieldName="name"
              value={profileData?.name || profileData?.userId?.name}
              isEditing={editingField === "name"}
              formData={formData}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleBlurOn={handleBlurOn}
              handleSave={handleSaveBasicProfile}
              setEditingField={setEditingField}
              className="text-2xl font-bold"
              inputClassName="text-2xl font-bold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <p className="text-gray-600 text-xs dark:text-gray-400">
              {(!ProfileDataLoadingApi &&
                (profileData?.email || profileData?.userId?.email)) ??
                ""}
            </p>

            {user?.role === "mentor" && (
              <>
                <EditableField
                  fieldName="headline"
                  value={profileData?.headline}
                  isEditing={editingField === "headline"}
                  formData={formData}
                  formErrors={formErrors}
                  handleInputChange={handleInputChange}
                  handleBlurOn={handleBlurOn}
                  handleSave={handleSaveAdditionalInfo}
                  setEditingField={setEditingField}
                />

                <EditableField
                  fieldName="expirience"
                  value={`${profileData?.expirience}+ years experience`}
                  isEditing={editingField === "expirience"}
                  formData={formData}
                  formErrors={formErrors}
                  handleInputChange={handleInputChange}
                  handleBlurOn={handleBlurOn}
                  handleSave={handleSaveAdditionalInfo}
                  setEditingField={setEditingField}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {user?.role === "mentor" && (
        <>
          <AboutSection
            editingField={editingField}
            formData={formData}
            formErrors={formErrors}
            profileData={profileData}
            handleBlurOn={handleBlurOn}
            handleInputChange={handleInputChange}
            handleSaveAdditionalInfo={handleSaveAdditionalInfo}
            setEditingField={setEditingField}
          />

          <LanguagesSection languages={profileData?.languages || []} />

          <SkillsSection skills={profileData?.assessedSkills || []} />

          <AvailabilitySection
            openAvailabilityDialog={() => setAvailibilityDialogOpen(true)}
          />
        </>
      )}

      <AvailabilityModal
        setDialogOpen={setAvailibilityDialogOpen}
        dialogOpen={availibilityDialogOpen}
      />
    </Container>
  );
};

export default GeneralPage;
