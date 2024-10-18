import Container from "@/components/Container";
import { useGetRoadmapsPublishedQuery } from "@/features/roadmaps/services/api/roadmapApi";
import { useNavigate } from "react-router-dom";

export const RoadmapsListed = () => {
  const { data = [] } = useGetRoadmapsPublishedQuery({});
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/roadmap/${id}`);
  };
  return (
    <Container className="mb-7">
      <div className="flex flex-col  ms-[12%] sm:ms-[0%] max-w-[70%] justify-center sm:max-w-[100%] mt-9 space-y-1 items-center ">
        <h1 className="sm:text-3xl text-2xl text-center dark:text-white text-gray-800 font-extrabold">
          Community Passionate About Knowledge
        </h1>
        <h3 className="text-gray-700 sm:text-1xl text-xs text-center font-medium">
          Your Journey to Mastery Starts Here, with Specialized Roadmaps and
          Dedicated Mentors.
        </h3>
      </div>
      <div className="grid mt-10 grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-[5rem]  sm:px-[12em]">
        {data?.map((roadmap) => (
          <div
            onClick={() => handleClick(roadmap.id)}
            key={roadmap.id}
            className="flex shadow-sm items-center justify-center w-full h-10 border rounded-md cursor-pointer dark:hover:bg-gray-950 hover:bg-gray-100 "
          >
            <h4 className="font-semibold tracking-wide">{roadmap.title}</h4>
          </div>
        ))}
      </div>
    </Container>
  );
};
