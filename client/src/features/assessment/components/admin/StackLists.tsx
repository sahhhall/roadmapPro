import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import {
  ListChecks,
  PlusCircle,
  BookOpen,
  Settings,
  Trash,
} from "lucide-react";
import { CreateStackModal } from "@/features/assessment/components/admin/modals/CreateStackModal";
import { useState } from "react";
import { useGetStacksQuery } from "@/features/assessment/services/api/assessementApi";

export const StackList = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const openDialog = () => setDialogOpen(true);
  const navigate = useNavigate();

  const { data: stacks, isLoading, refetch } = useGetStacksQuery({});

  if (isLoading) return <p>Loading...</p>;

  const openQuesionsList = (id: string) => {
    navigate(`/admin/assessment-managment/${id}`);
  };
  const handleDelete = (questionId: string) => {
    console.log(questionId, "handleDelete");
  };

  return (
    <Container className="mx-auto px-7 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 dark:bg-transparent border border-1-black bg-gray-50 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-blue-900 mb-6">
            Assessment Management
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center text-blue-800 gap-2 text-xs">
                <PlusCircle className="w-3 h-3" />
                <h3 className="font-semibold">Create Stacks</h3>
              </div>
              <p className="text-gray-600 text-xs">
                Start by creating technology stacks for different domains like
                MERN, Data Science, etc.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-blue-800 gap-2 text-xs">
                <ListChecks className="w-3 h-3" />
                <h3 className="font-semibold">Add Questions</h3>
              </div>
              <p className="text-gray-600 text-xs">
                Build your question bank by adding questions specific to each
                technology stack.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-blue-800 gap-2 text-xs">
                <BookOpen className="w-3 h-3" />
                <h3 className="font-semibold">Manage Assessments</h3>
              </div>
              <p className="text-gray-600 text-xs">
                Create and customize assessments by selecting questions from
                your question bank.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-blue-800 gap-2 text-xs">
                <Settings className="w-3 h-3" />
                <h3 className="font-semibold">Configure Settings</h3>
              </div>
              <p className="text-gray-600 text-xs">
                Set time limits, difficulty levels, and other assessment
                parameters.
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={openDialog}
                className="w-full border-blue-100"
                variant={"outline"}
              >
                Create Stack
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 max-h-screen space-y-3 gap-5">
          {stacks &&
            stacks?.map((stack: { id: string; name: string }) => (
              <Card
                key={stack.id}
                className="h-fit cursor-pointer dark:bg-transparent bg-white"
                onClick={() => openQuesionsList(stack.id)}
              >
                <div className="flex flex-row items-center justify-between p-4">
                  <CardTitle className="text-sm tracking-widest dark:text-white text-black cursor-pointer">
                    {stack.name}
                  </CardTitle>
                  <Trash
                    className="w-5 h-5 text-black-500 cursor-pointer hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(stack.id);
                    }}
                  />
                </div>
              </Card>
            ))}
        </div>

        <div className="m-5">
          <CreateStackModal
            setDialogOpen={setDialogOpen}
            dialogOpen={dialogOpen}
            refetchStacks={refetch}
          />
        </div>
      </div>
    </Container>
  );
};

export default StackList;
