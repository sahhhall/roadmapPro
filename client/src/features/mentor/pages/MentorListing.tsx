import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMentorsBySkillQuery } from "@/features/mentor/services/api/mentorApi";
import { useLocation, useNavigate } from "react-router-dom";
import { usegetUser } from "@/hooks/usegetUser";

const MentorListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const user = usegetUser();
  const userId = user?.id || "";
  const location = useLocation();
  const navigate = useNavigate();
  const skill = location.state?.skill || "";
  const {
    data: mentors,
    isLoading,
    refetch,
  } = useGetMentorsBySkillQuery({ skill, userId });
  useEffect(() => {
    refetch();
  }, []);
  const handleNavigateToMentorProfile = (mentorId: string) => {
    navigate(`/mentor-profile/${mentorId}`);
  };
  if (isLoading) {
    return (
      <>
        <p>isLoading</p>
      </>
    );
  }
  return (
    <div className="flex flex-col md:flex-row w-full gap-6 p-4">
      <div className="hidden md:block w-[20rem] ">
        <FiltersPanel />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for any Skill, domain or name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger className="md:hidden">Filters</SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FiltersPanel />
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-4">
          {mentors?.map((mentor) => (
            <div
              onClick={() => handleNavigateToMentorProfile(mentor?.userId?.id)}
              key={mentor.id}
              className="bg-white shadow-md rounded-lg p-6 hover:cursor-pointer"
            >
              <div className="flex flex-1 ">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={
                      mentor?.userId?.avatar
                        ? mentor?.userId?.avatar
                        : "https://github.com/shadcn.png"
                    }
                    alt={`${mentor.userId.name}'s avatar`}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                  />
                </div>

                <div className="flex  flex-col  ms-2">
                  {/* mentroname */}
                  <h3 className="text-lg font-semibold">
                    {mentor.userId.name}{" "}
                    <span className="text-xs ms-2   inline-flex  font-medium text-gray-700">
                      {" "}
                      | &nbsp; {mentor.expirience}+ year expirience
                    </span>
                  </h3>

                  {/* mentorheadline */}
                  <p className="text-gray-600 text-sm">{mentor.headline}</p>

                  {/* languages */}
                  <div className="flex mt-2 items-center space-x-2 mb-2">
                    {mentor.languages.map((language) => (
                      <span
                        key={language}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-md"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="flex-wrap text-xs text-gray-700 mb-2">
                      {`${
                        mentor.bio.length > 170
                          ? `${mentor.bio.slice(0, 170)}...`
                          : mentor.bio
                      }`}
                      {mentor.bio.length > 170 && (
                        <span
                          onClick={() => {}}
                          className="text-blue-500 cursor-pointer"
                        >
                          read more
                        </span>
                      )}
                    </p>
                  </div>

                  {/* skills  */}
                  <div className="flex flex-wrap items-center  gap-2 mt-2">
                    {mentor.assessedSkills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.assessedSkills.length > 6 && (
                      <span className="text-xs text-gray-500 ml-2">
                        +{mentor.assessedSkills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button variant={"submit"} className="h-4 mt-4 w-full">
                More Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FiltersPanel = () => {
  return <div className="space-y-6">here filter comes huhuh</div>;
};

export default MentorListing;
