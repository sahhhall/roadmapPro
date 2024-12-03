import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LoaderCircle, X } from "lucide-react";
import React from "react";
import { NodeDetailsResponse } from "@/features/roadmaps/types/roadmap";
import { Button } from "@/components/ui/button";
interface INodeDetailsProps {
  closeSheet: () => void;
  isOpen: boolean;
  nodeDetails: NodeDetailsResponse;
  isLoading: boolean;
}

const NodeDetailsSheet: React.FC<INodeDetailsProps> = React.memo(
  ({ closeSheet, isOpen, nodeDetails, isLoading }) => {
    // for avoid render
    if (!isOpen) return null;
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent>
          {isLoading ? (
            <>
              <div className="flex animate-spin items-center justify-center h-full">
                <LoaderCircle />
              </div>
            </>
          ) : (
            <></>
          )}
          <SheetHeader className="p-4 flex  items-start   flex-col">
          <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <Button className="text-gray-600 text-xs items-center me-2 border">
                  done
                  <span className="ml-2 inline-block h-3 w-3 bg-green-500 rounded-full"></span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-xs text-gray-500 max-w-xl sm:w-fit"
                    >
                      update status <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-16 justify-center text-center items-center">
                    <DropdownMenuCheckboxItem>pending</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem disabled>
                      Activity Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>completed</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <X
                className="cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-500"
                onClick={closeSheet}
                style={{
                  position: "absolute",
                  top: "21px",
                  right: "10px",
                }}
              />
            </div>
            <div className="">
              <SheetTitle className="mt-6">
                <span className="font-extrabold text-sm sm:text-2xl ">
                  {nodeDetails?.title}
                </span>
              </SheetTitle>
            </div>
            <SheetDescription className="text-left items-start justify-start">
              <span className="text-xs">{nodeDetails?.description}</span>
            </SheetDescription>
          </SheetHeader>
          <h5 className="text-xs p-4 font-medium text-gray-600 mb-2">
            📖 Learn more about {nodeDetails?.title} from the links below:
          </h5>

          <div className="flex items-center  space-x-2">
            <span className="w-2 h-[.5px] bg-gray-400"></span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Free Resources
            </span>
            <span className="flex-grow h-[.5px] bg-gray-400" />
          </div>
          <div className="p-4 flex flex-col space-y-2">
            {nodeDetails?.links?.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                className="text-blue-600 hover:underline text-sm flex items-center space-x-2"
              >
                <span>🔗</span>
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

export default NodeDetailsSheet;
