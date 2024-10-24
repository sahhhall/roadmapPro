import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Container from "@/components/Container";
import { useNavigate } from "react-router-dom";
import { ListChecks, PlusCircle, BookOpen, Settings } from "lucide-react";
import { CreateStackModal } from "./modals/CreateStackModal";
import { useState } from "react";

export const StackList = () => {
  const stacks = [
    { id: "1", title: "MERN" },
    { id: "2", title: "MEAN" },
    { id: "3", title: "Data Science" },
    { id: "4", title: "Machine Learning" },
    { id: "5", title: "DevOps" },
    { id: "1", title: "MERN" },
    { id: "2", title: "MEAN" },
    { id: "3", title: "Data Science" },
    { id: "4", title: "Machine Learning" },
    { id: "5", title: "DevOps" },
  ];
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const openDialog = () => setDialogOpen(true);
  const navigate = useNavigate();
  const openQuesionsList = (id: string) => {
    navigate(`/admin/assessment-managment/:${id}`);
  };

  return (
    <Container className="mx-auto px-7 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 dark:bg-transparent border border-1-black bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Assessment Management</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <PlusCircle className="w-5 h-5" />
                <h3 className="font-semibold">Create Stacks</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Start by creating technology stacks for different domains like
                MERN, Data Science, etc.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <ListChecks className="w-5 h-5" />
                <h3 className="font-semibold">Add Questions</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Build your question bank by adding questions specific to each
                technology stack.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-semibold">Manage Assessments</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Create and customize assessments by selecting questions from
                your question bank.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Settings className="w-5 h-5" />
                <h3 className="font-semibold">Configure Settings</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Set time limits, difficulty levels, and other assessment
                parameters.
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={openDialog}
                className="w-full"
                variant={"outline"}
              >
                Create Stack
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{ overflow: "auto" }}
          className="lg:col-span-3  overflow-scroll max-h-screen grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5"
        >
          {stacks.map((stack) => (
            <Card
              key={stack.id}
              className="hover:shadow-lg h-fit dark:bg-transparent bg-gray-50 transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl">{stack.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <Button
                  onClick={() => openQuesionsList(stack.id)}
                  variant="outline"
                  className="flex items-center"
                >
                  View Questions
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="m-5">
          <CreateStackModal
            setDialogOpen={setDialogOpen}
            dialogOpen={dialogOpen}
          />
        </div>
      </div>
    </Container>
  );
};

export default StackList;
