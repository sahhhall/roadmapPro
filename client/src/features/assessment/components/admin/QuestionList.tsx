import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Settings, Trash2, Edit2 } from "lucide-react";
import { useGetQuestionsByStackIdQuery } from "@/features/assessment/services/api/assessementApi";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreateQuestionModal } from "./modals/CreateQuestionModal";
const QuestionList = () => {
  const { id } = useParams();
  const { data: questions, refetch } = useGetQuestionsByStackIdQuery(id ?? "", {
    skip: !id,
  });
  // console.log(questions, "data");
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const openDialog = () => setCreateDialogOpen(true);
  return (
    <Container className="mx-auto px-7 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 h-full dark:bg-transparent border border-1-black bg-gray-50 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-blue-900 mb-6">
            Question Management
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center  text-blue-800 gap-2 text-xs">
                <PlusCircle className="w-5 h-5" />
                <h3 className="font-bold">Create Question</h3>
              </div>
              <p className="text-gray-600 text-xs">
                Start by creating technology stacks for different domains like
                MERN, Data Science, etc.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center  text-blue-800 gap-2 text-xs">
                <Settings className="w-5 h-5" />
                <h3 className="font-bold">Configure Settings</h3>
              </div>
              <p className="text-gray-600 text-xs">
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
                Create Question
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3   max-h-screen space-y-3  gap-5">
          {!questions?.length ? (
            <>
              <div>nothing here</div>
            </>
          ) : (
            <>
              {questions &&
                questions?.map((q) => (
                  <Card
                    key={q.id}
                    className="hover:shadow-lg h-fit dark:bg-transparent bg-gray-50 flex flex-col p-2 transition-shadow duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{q.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex align-middle   flex-col">
                      {q?.options.map((option: any, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-y-2 text-xs  text-center gap-2 ${
                            option === q.correctAnswer
                              ? "text-black dark:text-white font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          <Input
                            type="radio"
                            name={`question-${q.id}`}
                            disabled
                            checked={option === q.correctAnswer}
                            className="w-3 h-3"
                          />
                          <label>{option}</label>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="w-4   h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </>
          )}
        </div>
      </div>
      <CreateQuestionModal
        dialogOpen={createDialogOpen}
        refetchQuestions={refetch}
        setDialogOpen={setCreateDialogOpen}
      />
    </Container>
  );
};

export default QuestionList;
