import { LoginForm } from "@/features/admin/components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/4 h-full flex flex-col">
        <h1 className="text-3xl text-center font-extrabold">Admin Login</h1>
        <p className="text-center mt-1 mb-6 text-xs text-gray-500">
          Welcome back! Let's analyze what's going on.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
