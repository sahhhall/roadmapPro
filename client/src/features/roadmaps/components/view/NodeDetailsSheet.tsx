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
    console.log("nodedetails", nodeDetails);
    // for avoid render
    if (!isOpen) return null;
    console.log("hi");
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
          <SheetHeader className="p-4 flex justify-between  flex-col">
            <div className="flex justify-between items-center">
              <div>
                <Button className="text-gray-600   text-xs items-center me-2 border ">
                  done
                  <span className="ml-2 inline-block h-3 w-3 bg-green-500 rounded-full"></span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className=" text-xs text-gray-500"
                    >
                      update status <ChevronDown />{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-16 justify-center text-center items-center">
                    <DropdownMenuCheckboxItem>pending</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem disabled>
                      Activity Bar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      completed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <X
                  className="cursor-pointer transition-colors duration-500 hover:text-gray-500"
                  onClick={closeSheet}
                />
              </div>
            </div>
            <div >
              <SheetTitle className="mt-6">
                <span className=" font-extrabold text-2xl ">
                  {nodeDetails?.title}
                </span>
              </SheetTitle>
            </div>
            <SheetDescription>
              <span className="text-xs tracking-wide ">
                {nodeDetails?.description}
              </span>
            </SheetDescription>
          </SheetHeader>
          {/* <h5 className="text-sm p-4 font-medium text-gray-700 mb-2">
            You can learn more about {nodeDetails?.title} from the links below:
          </h5> */}

          <div className="flex items-center  space-x-2">
            <span className="w-2 h-[.5px] bg-gray-400"></span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Free Resources
            </span>
            <span className="flex-grow h-[.5px] bg-gray-400" />
          </div>
          <div className="p-4 flex flex-col ">
            {nodeDetails?.links?.map((item) => (
              <a
                target="_blank"
                key={item.title}
                href={item.url}
                className="text-blue-600  hover:underline text-sm"
              >
                {item.title}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
);

export default NodeDetailsSheet;
