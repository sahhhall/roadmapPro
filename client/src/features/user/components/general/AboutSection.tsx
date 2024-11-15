import { Pen } from "lucide-react";
import { FormDataa, FormErrors, ProfileData } from "../../types/general";

interface AboutSectionProps {
  editingField: string | null;
  formData: FormDataa;
  formErrors: FormErrors;
  profileData: ProfileData;
  handleBlurOn: (field: string) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSaveAdditionalInfo: (fieldName: string, value: string) => void;
  setEditingField: (field: string | null) => void;
}

export const AboutSection = ({
  editingField,
  formData,
  formErrors,
  profileData,
  handleBlurOn,
  handleInputChange,
  handleSaveAdditionalInfo,
  setEditingField,
}: AboutSectionProps) => (
  <div className="w-full mt-4 shadow-sm dark:border-gray-800 bg-white border border-gray-100 dark:bg-black rounded-lg">
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">About</h2>
        {editingField === "bio" ? (
          <textarea
            name="bio"
            onBlur={() => handleBlurOn("bio")}
            onChange={handleInputChange}
            value={formData?.bio}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSaveAdditionalInfo("bio", formData?.bio)
            }
            className="w-full bg-transparent border dark:text-gray-400 text-gray-600 text-sm rounded-md p-2 focus:outline-none focus:border-blue-500"
            rows={4}
            autoFocus
          />
        ) : (
          <p
            className="text-gray-600 text-sm group dark:text-gray-400 cursor-pointer"
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
    </div>
  </div>
);
