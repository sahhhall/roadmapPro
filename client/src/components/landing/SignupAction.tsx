import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { usegetUser } from "@/hooks/usegetUser";

const SignUpSection = () => {
  const navigate = useNavigate();

  const user = usegetUser();
  const handleSignup = () => {
    navigate("/signup");
  };
  const SignUpHeading = () => (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter">
        Join 45M+ users today
      </h1>
      <p className="mt-1 text-xs sm:text-md text-white text-opacity-60">
        Start for free — upgrade anytime.
      </p>
      <p className="mt-1 px-2 sm:text-md text-xs text-white text-opacity-60">
        Our platform connects learners with experts, empowering you to master
        your goals.
      </p>
    </>
  );

  const SignUpButton = () => (
    <Button
      className="flex cursor-pointer text-xs gap-2 items-start pt-2 pr-5 pb-3.5 pl-7 mt-4 bg-blue-500 border border-blue-500 border-solid rounded-lg "
      onClick={handleSignup}
    >
      <span>Sign up free</span>
      <span className="whitespace-nowrap" aria-hidden="true">
        →
      </span>
    </Button>
  );

  return (
    <section
      aria-label="Sign Up Section"
      className="flex mx-6 min-w-[90%] items-center py-10 justify-center  text-lg text-center text-white rounded-2xl bg-slate-900"
    >
      <div className="flex flex-col items-center ">
        <div className="flex flex-col items-center ">
          <SignUpHeading />
          {!user && <SignUpButton />}
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
