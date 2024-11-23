import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useGetMentorsBySkillQuery } from "@/features/mentor/services/api/mentorApi";
import { useLocation, useNavigate } from "react-router-dom";
import { usegetUser } from "@/hooks/usegetUser";
import FiltersPanel from "@/features/mentor/components/mentor/FilterPanel";
import Searchh from "@/features/mentor/components/mentor/Search";
import { IFilterMentorList } from "@/features/mentor/types/mentor";
import { SearchX } from "lucide-react";

const MentorListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<IFilterMentorList>({
    companies: "",
    expirience: 0,
    languages: "",
    search: "",
  });

  const user = usegetUser();
  const userId = user?.id || "";
  const location = useLocation();
  const navigate = useNavigate();
  const skill = location.state?.skill || "";

  const {
    data: mentors,
    isLoading,
    refetch,
  } = useGetMentorsBySkillQuery({
    skill,
    userId,
    companies: filters.companies,
    expirience: filters.expirience,
    languages: filters.languages,
    search: filters.search,
  });
  useEffect(() => {
    refetch();
  }, [filters]);
  console.log(mentors, "mentords");
  const handleNavigateToMentorProfile = (mentorId: string) => {
    navigate(`/mentor-profile/${mentorId}`);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
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
        <FiltersPanel onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-4 mb-6">
          <Searchh onFilterChange={handleFilterChange} />
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger className="md:hidden">Filters</SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FiltersPanel onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
        </div>

        {!mentors || mentors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <SearchX className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg dark:text-white font-semibold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              We couldn't find any mentors matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <div
                onClick={() =>
                  handleNavigateToMentorProfile(mentor?.userProfile[0]?._id)
                }
                key={mentor.id}
                className="bg-white dark:bg-transparent dark:border shadow-md rounded-lg p-6 hover:cursor-pointer"
              >
                <div className="flex flex-1 ">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={mentor?.userProfile[0]?.avatar? mentor?.userProfile[0]?.avatar: "https://github.com/shadcn.png"}
                      alt={`${mentor.userProfile.name}'s avatar`}
                      className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                    />
                  </div>

                  <div className="flex flex-col ms-2">
                    <h3 className="text-lg font-semibold">
                      {mentor.userProfile[0]?.name}
                      <span className="text-xs ms-2 inline-flex font-medium text-gray-700">
                        | &nbsp; {mentor.expirience}+ year expirience
                      </span>
                    </h3>

                    <p className="text-gray-600 text-sm">{mentor.headline}</p>

                    <div className="flex mt-2 items-center space-x-2 mb-2">
                      {mentor.languages.map((language) => (
                        <span key={language}className="text-xs dark:bg-transparent dark:border px-2 py-1 bg-gray-100 rounded-md">
                          {language}
                        </span>
                      ))}
                    </div>
                    <div>
                      <p className="flex-wrap text-xs text-gray-700 mb-2">
                        {`${mentor.bio.length > 170? `${mentor.bio.slice(0, 170)}...`: mentor.bio}`}
                        {mentor.bio.length > 170 && (
                          <span className="text-blue-500 cursor-pointer">
                            read more
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {mentor.assessedSkills.slice(0, 6).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 dark:bg-transparent dark:border dark:text-white bg-blue-50 text-blue-700 rounded-md text-xs"
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
        )}
      </div>
    </div>
  );
};

export default MentorListing;
