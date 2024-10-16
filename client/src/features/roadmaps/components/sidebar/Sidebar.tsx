import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
const Sidebar = ({ onDragStart, onSaveRoadmap, isLoading }: any) => {
  return (
    <aside className="border-r flex flex-col justify-between border-gray-200 p-4 bg-gray-50 w-64">
      <div>
        <div className="text-sm text-gray-600 mb-4">
          You can drag these nodes to the pane on the right.
        </div>
        <div
          className=" border border-gray-1 p-2 mb-2 rounded cursor-move"
          onDragStart={(event) => onDragStart(event, "topic")}
          draggable
        >
          Topic
        </div>

        <div
          className=" border border-gray-1  p-2 rounded cursor-move"
          onDragStart={(event) => onDragStart(event, "subtopic")}
          draggable
        >
          SubTopic
        </div>
      </div>

      <Button
        onClick={onSaveRoadmap}
        variant={"submit"}
        className={`mb-0 flex hover:text-gray-400`}
      >
        {" "}
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Save Roadmap"}
      </Button>
    </aside>
  );
};

export default Sidebar;
