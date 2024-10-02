import { LoginForm } from "../components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className=" min-h-screen   flex items-center justify-center ">
      <div className="w-25% h-100 flex flex-col ">
        <h1 className="text-3xl text-center font-extrabold">Admin Login</h1>
        <p className=" text-center mt-1  mb-6 text-xs text-gray-500">
          Welcome back! Let's analyze what goin on.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
