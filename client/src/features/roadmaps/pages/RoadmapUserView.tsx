import { useNavigate, useParams } from "react-router-dom";
import { useGetRoadMapByIDQuery } from "../services/api/roadmapApi";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Container from "@/components/Container";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoadmapFlow } from "@/features/roadmaps/components/view/RoadMapFlow";

interface RoadmapData {
  nodes: any[];
  edges: any[];
  title?: string;
  description?: string;
}

const RoadmapUserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: roadmapData, isLoading } = useGetRoadMapByIDQuery(id as string);
  console.log(roadmapData,"data");
  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen flex flex-col text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto w-full mt-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center space-x-2">
              <div className=" flex items-center  space-x-1">
                <ArrowLeft onClick={()=> navigate('/') } className=" text-gray-400 cursor-pointer" size={20} />
                {/* <span className="text-xs text-gray-400 font-semibold">Back to Home</span> */}
              </div>
              <div className=" flex items-center space-x-2">
                <Bookmark size={25} className="text-gray-400 cursor-pointer" />
                <Button className="bg-indigo-600 text-white rounded-md px-3    text-sm font-medium flex items-center space-x-1">
                  <Share2 size={16} />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            <div className="ms-3 mt-4">
              <h1 className="text-4xl font-bold mb-2">
                {roadmapData?.title || "Node.js Developer"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {roadmapData?.description ||
                  "Step by step guide to becoming a modern Node.js developer in 2024"}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold flex items-center">
                Connect with Mentor
                <span className="h-2 w-2 bg-green-500 rounded-full ml-2"></span>
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Get guidance and support from experienced professionals in your
                field.
              </p>
            </div>
            <Button className="bg-indigo-600 text-white rounded-md px-3 py-1 text-sm">
              Connect
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 text-sm">
              <span className="bg-yellow-400 text-black rounded-full px-2 py-0.5 text-xs font-medium">
                0% Done
              </span>
              <span>0 of {roadmapData?.nodes?.length} Done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow mt-8">
        <ReactFlowProvider>
          <Container className="w-full h-[600px]">
            <RoadmapFlow roadmapData={roadmapData as RoadmapData} />
          </Container>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default RoadmapUserView;
