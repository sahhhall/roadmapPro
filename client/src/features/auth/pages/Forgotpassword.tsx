import Container from "@/components/Container";
import ForgotPassowrdForm from "../components/ForgotPassowordForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Forgotpassword = () => {
  return (
    <Container className="min-h-96 flex items-center justify-center ">
      <div className=" mt-7 flex flex-col max-w-80 w-full h-auto ">
        <h1 className="text-3xl w-full text-center font-extrabold">
          Forgot Password?
        </h1>
        <p className=" text-center mt-1 mb-5   text-xs text-gray-400">
          Enter your email address below and we will <br /> send you a link to
          reset your password.
        </p>
        <ForgotPassowrdForm />
        <Button
          className="dark:text-white w-full mt-3    border   rounded-md  text-black text-center"
          type="submit"
        >
          <span className="text-xs text-gray-500">Don't have an account?</span>
          <Link className="ps-1 text-xs  text-blue-700" to={"/signup"}>
            Sign up
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default Forgotpassword;
