import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import SignupForm from "../components/SignupForm";
// import img from "../../../assets/images/illustration.png";
import { useState } from "react";
import Otp from "../components/Otp";
const SignupPage = () => {
  const { handleSuccess, handleError } = useGoogleLogin();
  const [showOtppage, setShowOtppage] = useState<boolean>(false);
  return (
    <div className="min-h-96   flex items-center justify-center ">
      <div className="flex mt-7  items-center   lg:space-y-0 lg:space-x-12 lg:justify-between">
        {/* <div className="dark:hidden lg:w-[550px]  lg:block hidden  ">
          <img
            src={img}
            alt="Illustration"
            className="w-full h-auto object-contain"
          />
        
        </div> */}
        <div className="w-25% flex flex-col ">
          {showOtppage ? (
            <>
              <h1 className="text-3xl text-center font-extrabold">Signup</h1>
              <p className=" text-center mt-1   text-xs text-gray-500">
                Create an account to achieve new skills,
                <br /> and be part of our mentors .
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
                <span className="mx-2 text-xs text-white-400 opacity-50 ">
                  OR
                </span>
                <hr className="flex-grow border-white-400" />
              </div>
              <div className="max-w-100 w-full" style={{ minHeight: "450px" }}>
                <SignupForm setShowOtppage={setShowOtppage} />
              </div>
            </>
          ) : (
            <Otp />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
