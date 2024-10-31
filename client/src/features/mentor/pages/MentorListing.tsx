import { useState } from "react";
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

const MentorListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const mentors = [
    {
      userId: {
        name: "Bruce Wayne",
        email: "brucewayne@gmail.com",
        avatar:
          "https://lh3.googleusercontent.com/a/ACg8ocJ4anfTke9LbZC1H8LusVLurdjFAOqsyeZRxJzOirKFuCGMckzt=s96-c",
        id: "672322a107a808266968ad6a",
      },
      assessedSkills: [
        "Node js",
        "GraphQL",
        "gRPC",
        "Microservices",
        "Kubernetes",
        "React",
      ],
      headline:
        "Database Engineer @ Netflix | Former Full Stack Engineer @ Google | Ex-Meta |",
      bio: "With over 6 years of experience across top tech companies, I bring a strong background in both backend and frontend development With over 6 years of experience across top tech companies, I bring a strong background in both backend and frontend development.",
      languages: ["english", "malayalam"],
      githubUrl: "https://github.com/sahhhall",
      linkedinUrl: "https://www.linkedin.com/in/muhammedsahalkk",
      experience: "7",
      sessionPrice: 0,
      totalMeetings: 5,
      createdAt: "2024-10-31T06:37:36.779Z",
      id: "672325b05ae815acc3eafa19",
    },
    {
      userId: {
        name: "Clark Kent",
        email: "clarkkent@dailyplanet.com",
        avatar:
          "https://lh3.googleusercontent.com/a/ACg8ocJ4anfTke9LbZC1H8LusVLurdjFAOqsyeZRxJzOirKFuCGMckzt=s96-c",
        id: "872322a107a808266968ad6b",
      },
      assessedSkills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Angular",
        "Node.js",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Angular",
        "Node.js",
      ],
      headline: "Frontend Engineer @ Daily Planet | Ex-Meta |",
      bio: "Frontend expert with extensive experience in building responsive and scalable applications.",
      languages: ["english", "spanish"],
      githubUrl: "https://github.com/clarkkent",
      linkedinUrl: "https://www.linkedin.com/in/clarkkent",
      experience: "5",
      sessionPrice: 100,
      totalMeetings: 15,
      createdAt: "2023-05-12T06:37:36.779Z",
      id: "872325b05ae815acc3eafa21",
    },
    {
      userId: {
        name: "Diana Prince",
        email: "dianaprince@amazon.com",
        avatar:
          "https://lh3.googleusercontent.com/a/ACg8ocJ4anfTke9LbZC1H8LusVLurdjFAOqsyeZRxJzOirKFuCGMckzt=s96-c",
        id: "972322a107a808266968ad6c",
      },
      assessedSkills: [
        "Microservices",
        "Kubernetes",
        "Docker",
        "React",
        "TypeScript",
      ],
      headline: "Backend Engineer @ Amazon | Ex-Google |",
      bio: "Backend developer specializing in microservices and cloud infrastructure, with experience from Google and Amazon.",
      languages: ["english", "french"],
      githubUrl: "https://github.com/dianaprince",
      linkedinUrl: "https://www.linkedin.com/in/dianaprince",
      experience: "6",
      sessionPrice: 150,
      totalMeetings: 20,
      createdAt: "2022-08-20T06:37:36.779Z",
      id: "972325b05ae815acc3eafa22",
    },
    {
      userId: {
        name: "Barry Allen",
        email: "barryallen@starlabs.com",
        avatar:
          "https://lh3.googleusercontent.com/a/ACg8ocJ4anfTke9LbZC1H8LusVLurdjFAOqsyeZRxJzOirKFuCGMckzt=s96-c",
        id: "1072322a107a808266968ad6d",
      },
      assessedSkills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      headline: "Full Stack Developer @ STAR Labs",
      bio: "Full stack engineer with a focus on performance and scalability.",
      languages: ["english"],
      githubUrl: "https://github.com/barryallen",
      linkedinUrl: "https://www.linkedin.com/in/barryallen",
      experience: "4",
      sessionPrice: 200,
      totalMeetings: 25,
      createdAt: "2021-10-11T06:37:36.779Z",
      id: "1072325b05ae815acc3eafa23",
    },
  ];

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
            <SheetTrigger className="md:hidden">
                Filters
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FiltersPanel />
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white shadow-md rounded-lg p-6  "
            >
              <div className="flex flex-1 ">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={mentor.userId.avatar}
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
                      | &nbsp; {mentor.experience}+ year expirience
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
                Book Now
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
