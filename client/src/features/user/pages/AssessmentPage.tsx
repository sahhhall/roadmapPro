import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InstructionsPage from "./InstructionsPage";
import Question from "../components/mentortest/Question";
import {
  useLazyGetQuestionQuery,
  useSubmitMentorMutation,
} from "../services/api/mentorTestApi";
import CompletionPage from "../components/mentortest/CompletionPage";

const TOTAL_TIME = 300;
const AssessmentPage = () => {
  const location = useLocation();
  const testData = useState(location?.state?.testData) as any;
  const [step, setStep] = useState("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [questions, setQuestions] = useState([]) as any;
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [score, setScore] = useState<number | null>(null);

  const handleTimeUp = async () => {
    await handleSubmitTest();
  };
  useEffect(() => {
    if (step !== "questions" || timeRemaining <= 0) return;

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          handleTimeUp();
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [step, timeRemaining]);

  //apis
  const [fetchQuestion] = useLazyGetQuestionQuery();
  const [submitTest] = useSubmitMentorMutation();
  const handleStart = async () => {
    if (testData[0]?.questions?.length > 0) {
      try {
        const question = (await fetchQuestion(
          testData[0].questions[0]?.questionId
        ).unwrap()) as any;
        setQuestions([question]);
      } catch (error) {
        console.log("error from aessemetn start question fetach", error);
      }
    }
    setStep("questions");
    setTimeRemaining(TOTAL_TIME );
  };

  const handleAnswer = async (answer: any) => {
    console.log(answer, "what");
    setAnswers([...answers, answer]);
    const nextIndex = currentQuestionIndex + 1;
    if (currentQuestionIndex < testData[0]?.questions.length - 1) {
      setCurrentQuestionIndex(nextIndex);
      try {
        const nextQuestion = (await fetchQuestion(
          testData[0].questions[nextIndex]?.questionId
        ).unwrap()) as any;
        setQuestions([...questions, nextQuestion]);
      } catch (error) {
        console.log("error from aessemetn start question fetach", error);
      }
    } else {
      await handleSubmitTest();
    }
  };

  const handleSubmitTest = async () => {
    try {
      console.log(answers,"is anserts")
      const response = await submitTest(answers).unwrap();
      setScore(response.score);
      setStep("completed");
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };
  return (
    <div className=" w-full">
      {step === "instructions" && <InstructionsPage onStart={handleStart} />}

      {step === "questions" && (
        <Question
          onAnswer={handleAnswer}
          question={questions[currentQuestionIndex]}
          currentQuestionNumber={currentQuestionIndex + 1}
          timeRemaining={timeRemaining}
        />
      )}

      {step === "completed" && <CompletionPage score={score as number} />}
    </div>
  );
};

export default AssessmentPage;
