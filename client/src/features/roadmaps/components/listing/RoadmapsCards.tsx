import { useGetRoadmapsPublishedQuery } from "@/features/roadmaps/services/api/roadmapApi";
import { useNavigate } from "react-router-dom";

export const RoadmapsListed = () => {                 
  const { data = [] } = useGetRoadmapsPublishedQuery({});
  // const dummyRoadmaps = [
  //   { id: "1", title: "Backend Engineering" },
  //   { id: "2", title: "Frontend Engineering" },
  //   { id: "3", title: "Cloud Engineering" },
  //   { id: "4", title: "Data Structures" },
  //   { id: "5", title: "DevOps" },
  //   { id: "6", title: "AI & Machine Learning" },
  // ];
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/roadmap/${id}`);
  };
  return (
    <div className="mb-10 mt-[5rem] md:mt-[8rem] min-w-full ">
      <div className="flex flex-col sm:ms-[0%] max-w-[100%] justify-center  space-y-1 items-center ">
        <div className="flex items-center w-full  my-1">
          <div className="flex-grow  h-px bg-gray-300 dark:bg-gray-900"></div>
          <div className="mx-4 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm">
            Explore Roadmaps
          </div>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-900"></div>
        </div>

        <h3 className="text-gray-700 pb-3 pt-[1.4rem] sm:text-1xl text-sm text-center ">
          Your Journey to Mastery Starts Here, with Specialized Roadmaps and
          Dedicated Mentors.
        </h3>
      </div>
      <div className="grid grid-cols-2 mt-5  mx-auto px-7   md:grid-cols-3 gap-4 max-w-2xl">
        {data?.map((roadmap) => (
          <div
            key={roadmap.id}
            onClick={() => handleClick(roadmap.id)}
            className="flex  items-center justify-center w-full h-10 border rounded-md cursor-pointer 
                       hover:bg-gray-100 dark:hover:bg-gray-950 
                       transition-colors text-gray-600  duration-200 ease-in-out"
          >
            <h4 className=" text-xs sm:text-base text-center px-1">
              {roadmap.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
