import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import { ProfileForm } from "../components/LoginForm";

interface CredentialPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}
const LoginPage = () => {
  const responseMessage = (response: CredentialResponse) => {
    try {
      const credentials: CredentialPayload = jwtDecode(
        response.credential as string
      );
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };
  const errorMessage = (error: object): void => {
    console.log(error);
  };

  return (
    <div className="min-h-96  flex items-center justify-center ">
      <div className="w-25% mt-7 flex flex-col ">
        <h1 className="text-3xl text-center font-extrabold">Login</h1>
        <p className=" text-center mt-1   text-xs text-gray-500">Welcome back! Let's take you to your account.</p>
        <div className="w-full mt-7">
          <div>
            <GoogleLogin width={"350"} size="large" onSuccess={responseMessage} onError={errorMessage as any} />
          </div>
        </div>
        <div className="w-full flex items-center mt-4 mb-4">
          <hr className="flex-grow border-white-400" />
          <span className="mx-2 text-xs text-white-400 opacity-50 ">OR</span>
          <hr className="flex-grow border-white-400" />
        </div>
        <ProfileForm />
      </div>
    </div>
  );
};

export default LoginPage;
