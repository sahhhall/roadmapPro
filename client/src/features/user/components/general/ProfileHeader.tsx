import { Pen, LinkedinIcon } from "lucide-react";
import { ProfileData } from "../../types/general";
import { AvatarActions } from "./AvatarActions";

interface ProfileHeaderProps {
  profileData: ProfileData;
  updatedAvatar: string | null;
  photoSubmitLoading: boolean;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveBasicProfile: (fieldName: string, value: string | File) => void;
  inputFileRef: React.RefObject<HTMLInputElement>;
  setUpdatedAvatar: (value: string | null) => void;
}

export const ProfileHeader = ({
  profileData,
  updatedAvatar,
  photoSubmitLoading,
  handleAvatarUpload,
  handleSaveBasicProfile,
  inputFileRef,
  setUpdatedAvatar,
}: ProfileHeaderProps) => {
  return (
    <div className="w-full h-48 sm:h-64 rounded-t-lg relative">
      <div className="absolute inset-0 rounded-t-lg">
        <img
          src={
            updatedAvatar ||
            profileData?.avatar ||
            profileData?.userId?.avatar ||
            "https://github.com/shadcn.png"
          }
          alt="cover"
          className={` ${
            photoSubmitLoading && "animate-pulse"
          } w-full h-full object-cover rounded-t-lg opacity-20`}
        />
      </div>
      <div className="absolute right-3 -bottom-6">
        <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
      </div>
      <div className="absolute -bottom-12 left-6">
        <div
          className="w-21 h-21 sm:w-31 sm:h-31 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white cursor-pointer relative group"
          onClick={() => inputFileRef.current?.click()}
        >
          <img
            src={
              updatedAvatar ||
              profileData?.avatar ||
              profileData?.userId?.avatar ||
              "https://github.com/shadcn.png"
            }
            alt="profile"
            className={`${
              photoSubmitLoading ? "animate-pulse" : ""
            } w-20 h-20 object-cover`}
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
        <AvatarActions
          photoSubmitLoading={photoSubmitLoading}
          handleSaveBasicProfile={handleSaveBasicProfile}
          updatedAvatar={updatedAvatar}
          setUpdatedAvatar={setUpdatedAvatar}
          inputFileRef={inputFileRef}
        />
      )}
    </div>
  );
};
