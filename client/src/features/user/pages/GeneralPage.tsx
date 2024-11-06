import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import AvailabilityModal from "@/features/mentor/components/modals/AvalibilityModal";
import { usegetUser } from "@/hooks/usegetUser";
import { LinkedinIcon } from "lucide-react";
import { useState } from "react";
const GeneralPage = () => {
  const user = usegetUser();
  const [availibilityDialogOpen, setAvailibilityDialogOpen] =
    useState<boolean>(false);
  const openavailibilityDialog = () => setAvailibilityDialogOpen(true);
  return (
    <Container className="">
      {/* div for contenet like profile and user name and headlin  */}
      <div className="w-full border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black  rounded-lg ">
        <div className="w-full h-48 sm:h-64 rounded-t-lg relative">
          <div className="absolute inset-0  rounded-t-lg">
            <img
              src={user?.avatar}
              alt="cover"
              className="w-full h-full object-cover rounded-t-lg opacity-20"
            />
          </div>
          <div className="absolute right-3 -bottom-6 ">
            <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
          </div>
          <div className="absolute -bottom-12 left-6">
            <div className="w-21 h-21 sm:w-31 sm:h-31 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
              <img
                src={user?.avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pb-9 pt-16  px-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              {user?.role === "mentor" && (
                <>
                  <p className="text-gray-600 text-xs dark:text-gray-400">
                    {/* {user!.headline as any || */}
                    {
                      "Database Engineer @ Netflix | Former Full Stack Engineer @ Google | Ex-Meta |"
                    }
                  </p>
                  <p className="text-gray-600 text-xs dark:text-gray-400">
                    {
                      /* {user!.expirience as any|| "7+ Years expirience"} */ "7+ Years expirience"
                    }
                  </p>
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {/* {user?.bio || */}
                {
                  "I have experience of interviewing over 500+ excellent candidates at Microsoft and Tower Research. Apart from that, I also have formal mentorship experience having mentored students in programmes like Microsoft Code.fund.do, Codess, Engage 2020-21 ( I was also the main organiser in Microsoft India for this ), and having mentored over 15 interns in my experience, I believe I can help you with your goals. With the recently changing circumstances in tech industry, the best investment would be in skillset, be it technical or social, and I believe that is where my mentorship would help, in firstly quantifying goals appropriate for the current setups"
                }
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold mb-2">
                Languages That I Speak
              </h3>
              <div className="flex flex-wrap gap-2">
                {["english", "hindi"].map((language) => (
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
            {["java", "js"].slice(0, 6).map((skill) => (
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
              Create Stack
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
