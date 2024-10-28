import { Button } from "@/components/ui/button";
import { Timer, User, CheckCircle } from "lucide-react";
import React, { useState } from "react";

interface IQuestionProps {
  question: any;
  currentQuestionNumber: number;
  onAnswer: ({
    questionId,
    userAnswer,
  }: {
    questionId: string;
    userAnswer: string;
  }) => void;
  timeRemaining: number
}
const Question: React.FC<IQuestionProps> = ({
  question,
  currentQuestionNumber,
  onAnswer,
  timeRemaining
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-lg">{timeRemaining}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="sm:text-sm text-xs text-gray-600">
                Questions Attempted: {currentQuestionNumber-1}/5
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <User className="w-5 h-5 md:block hidden text-gray-600" />
            <span className=" text-xs  text-gray-600">Sahal KK</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Question {currentQuestionNumber}</h2>
          <p className="text-gray-700">{question?.question}</p>
        </div>

        <div className="space-y-4">
          {question?.options?.map((option: string, index: number) => (
            <div
              key={option}
              className={` ${
                selectedAnswer === option
                  ? "border-green-500 border-2 "
                  : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
              } bg-white rounded-lg shadow-sm p-4  cursor-pointer   `}
            >
              <div
                className={`flex items-center space-x-4 `}
                onClick={() => setSelectedAnswer(option)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                  {String.fromCharCode(65 + index)}
                </div>
                <p className="text-gray-700">{option}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          {/* <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Previous
          </button> */}
          <Button
            onClick={() => {
              if (selectedAnswer) {
                onAnswer({
                  questionId: question.id,
                  userAnswer: selectedAnswer,
                });
                setSelectedAnswer(null); 
              }
            }}
            disabled={!selectedAnswer}
            variant={'submit'}
            className="w-full mt-3"
          >
            {currentQuestionNumber === 5 ? "submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
