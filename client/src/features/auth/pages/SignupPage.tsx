import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  const { handleSuccess, handleError } = useGoogleLogin();
  return (
    <div className="min-h-96  flex items-center justify-center ">
      <div className="w-25% mt-7 flex flex-col ">
        <h1 className="text-3xl text-center font-extrabold">Signup</h1>
        <p className=" text-center mt-1   text-xs text-gray-500">
        Create an account to achieve new skills,<br /> and be part of our mentors .
        </p>
        <div className="w-full mt-7">
          <div>
            <GoogleLogin
              width={"350"}
              size="large"
              onSuccess={handleSuccess}
              onError={handleError as any}
            />
          </div>
        </div>
        <div className="w-full flex items-center mt-4 mb-4">
          <hr className="flex-grow border-white-400" />
          <span className="mx-2 text-xs text-white-400 opacity-50 ">OR</span>
          <hr className="flex-grow border-white-400" />
        </div>
        <div className="max-w-100">
        <SignupForm/>
        </div>
      
      </div>
    </div>
  );
};

export default SignupPage;
