import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, LinkedinIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const mockUsers = {
  1: {
    avatar: "/images/avatar1.jpg",
    name: "Jane Doe",
    role: "mentor",
    headline:
      "Database Engineer @ Netflix | Former Full Stack Engineer @ Google | Ex-Meta |",
    experience: "7+ Years experience",
    bio: "I have experience of interviewing over 500+ excellent candidates at Microsoft and Tower Research...",
    languages: ["English", "Hindi"],
    skills: ["Java", "JavaScript", "SQL", "Python", "React", "Node.js"],
    availableDates: [
      "Nov 4",
      "Nov 5",
      "Nov 6",
      "Nov 7",
      "Nov 4",
      "Nov 5",
      "Nov 6",
      "Nov 7",
    ],
    availableSlots: ["10:00 AM", "2:00 PM", "5:00 PM"],
  },
  2: {
    avatar: "/images/avatar2.jpg",
    name: "John Smith",
    role: "mentor",
    headline: "Senior Developer @ Amazon | Former Engineer @ LinkedIn",
    experience: "5+ Years experience",
    bio: "Passionate about mentoring and helping developers succeed...",
    languages: ["English", "Spanish"],
    skills: ["C#", ".NET", "Angular", "Azure", "TypeScript", "MongoDB"],
    availableDates: ["Nov 8", "Nov 9", "Nov 10", "Nov 11"],
    availableSlots: ["11:00 AM", "3:00 PM", "6:00 PM"],
  },
};

const MentorProfile = () => {
  const { mentorId } = useParams();
  const mentor = mockUsers[1] || {};

  const dateRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { toast } = useToast();

  const handleSelectTime = (slot: string) => {
    setSelectedTime(slot);
  };

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(selectedDate, selectedTime, "date and time");
    if (!selectedDate || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Uh oh! Select Properly.",
        description: "Select one Date and Time.",
      });
      return
    }
    

  };
  //   const scroll = (direction) => {
  //     const container = dateRef.current;
  //     if (!container) return;

  //     const scrollAmount = 200;
  //     const currentScroll = container.scrollLeft;
  //     const newScroll =
  //       direction === "left"
  //         ? currentScroll - scrollAmount
  //         : currentScroll + scrollAmount;

  //     container.scrollTo({
  //       left: newScroll,
  //       behavior: "smooth",
  //     });
  //   };
  return (
    <div className="relative flex">
      <div className="w-full sm:w-3/4 min-h-screen pb-20">
        <Container className="p-5 border ">
          {/* div for contenet like profile and user name and headlin  */}
          <div className="w-full  mt-16 border dark:border-gray-800 border-gray-100 shadow-sm bg-white dark:bg-black  rounded-lg ">
            <div className="w-full h-48 sm:h-64 rounded-t-lg relative">
              <div className="absolute inset-0  rounded-t-lg">
                <img
                  src={"https://github.com/shadcn.png"}
                  alt="cover"
                  className="w-full h-full object-cover rounded-t-lg opacity-20"
                />
              </div>
              <div className="absolute right-3 -bottom-6 ">
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
              </div>
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                  <img
                    src={"https://github.com/shadcn.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="pb-9 pt-16  px-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{mentor?.name}</h1>
                  {mentor?.role === "mentor" && (
                    <>
                      <p className="text-gray-800 text-xs font-medium dark:text-gray-400">
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
          {mentor?.role === "mentor" && (
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
                    Languages That He Speak
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
          {mentor?.role === "mentor" && (
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
        </Container>
      </div>

      {/* side div for booking */}
      <div className="hidden mt-16 sm:block w-1/4 fixed top-17 right-0 min-h-screen overflow-y-auto bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800">
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-purple-600">
                Book a Free 1:1 Trial:
              </h2>
              <p className="text-gray-600 text-xs dark:text-gray-400">
                To Plan Your Mentorship with {mentor.name}
              </p>
            </div>
            <hr />
            <div>
              {/* for availble date head  */}
              <div className="flex pb-3 pt-3 justify-between items-center mb-2">
                <h3 className="font-medium">Available Dates</h3>
                <div className="flex">
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronLeft />
                  </button>
                  <button
                    // onClick={() => scroll("right")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div
                ref={dateRef}
                className="grid grid-flow-col auto-cols-max overflow-x-auto scrollbar-hide pb-4 gap-3"
              >
                {mentor.availableDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectedDate(date)}
                    className={`border ${
                      selectedDate === date && "border-blue-500"
                    } rounded-lg p-2 text-center hover:border-blue-500 cursor-pointer`}
                  >
                    <div className="text-sm text-gray-500">MON</div>
                    <div className="font-medium">{date}</div>
                    <div className="text-xs text-green-500">13 Slots</div>
                  </button>
                ))}
              </div>
            </div>
            <hr />

            {/* avalible slots for mentor  */}
            <div className="pt-4">
              <div className="flex  justify-between items-center mb-2">
                <h3 className="font-medium">Available Slots</h3>
                <div className="flex ">
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronLeft />
                  </button>
                  <button
                    // onClick={() => scroll("right")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
              <div className="grid pt-3 pb-3 grid-flow-col auto-cols-max overflow-x-auto scrollbar-hide gap-3">
                {mentor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectTime(slot)}
                    className={` ${
                      selectedTime === slot && "border-blue-500"
                    } border rounded-lg p-2 text-center hover:border-blue-500 cursor-pointer`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              variant={"submit"}
              className="w-full"
            >
              Book Now
            </Button>
            {/* footer for booking div  */}
            <div className="text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>For:</span>
                <span>Technical Interview</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Duration:</span>
                <span>30 mins 1:1 call with the mentor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
