import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InstructionsPage from "./InstructionsPage";
import Question from "../components/mentortest/Question";
import {
  useLazyGetQuestionQuery,
  useSubmitMentorMutation,
} from "../services/api/mentorTestApi";
import CompletionPage from "../components/mentortest/CompletionPage";
import { usegetUser } from "@/hooks/usegetUser";

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
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  //this for makae it as a reusble user shoud be answer 80%questsion answer only then ge get 
  const totalQuestions = testData[0].questions.length;
  const passingScore = Math.ceil(totalQuestions * 0.8);

  const user = usegetUser();

  const handleTimeUp = async () => {
    await handleSubmitTest(answers);
  };
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isTestCompleted) {
        event.preventDefault();
      }
    };

    const handleBackNavigation = (event: PopStateEvent) => {
      if (!isTestCompleted) {
        event.preventDefault(); 
        const confirmNavigation = window.confirm(
          "Are you sure you want to leave? Your test will be submitted."
        );

        if (confirmNavigation) {
          handleSubmitTest(answers);
        } else {
          window.history.pushState(null, '', window.location.href);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [isTestCompleted, answers]);
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
        const question = await fetchQuestion(
          testData[0].questions[0]?.questionId
        ).unwrap() as any;
        setQuestions([question]);
      } catch (error) {
        console.log("error from aessemetn start question fetach", error);
      }
    }
    setStep("questions");
    setTimeRemaining(TOTAL_TIME);
  };

  const handleAnswer = async (answer: {
    questionId: string;
    userAnswer: string;
  }) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < testData[0]?.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      try {
        const nextQuestion = await fetchQuestion(
          testData[0].questions[nextIndex]?.questionId
        ).unwrap();
        setQuestions([...questions, nextQuestion]);
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
    } else {
      await handleSubmitTest(updatedAnswers);
    }
  };

  const handleSubmitTest = async (finalAnswers: any) => {
    try {
      const submitData = {
        id: testData[0]?.id,
        questions: finalAnswers,
      };
      console.log(submitData, "suubmutmiting");
      const response = await submitTest(submitData).unwrap();
      setScore(response.score);
      setIsTestCompleted(true)
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

      {step === "completed" && (
        <CompletionPage
          userName={user?.name}
          passingScore={passingScore}
          score={score as number}
        />
      )}
    </div>
  );
};

export default AssessmentPage;
