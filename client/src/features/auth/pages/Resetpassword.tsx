import Container from "@/components/Container";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const Resetpassword = () => {
  return (
    <Container className="min-h-96 flex items-center justify-center">
      <div className="mt-7 flex flex-col max-w-80 w-full h-auto">
        <h1 className="text-3xl  w-full text-center font-bold">
          Reset Your Password
        </h1>
        <p className="text-center mt-1 mb-5 text-xs text-gray-400">
          Enter your new password below to reset your account password. 
          Make sure to choose a strong password you haven't used before.
        </p>
        <ResetPasswordForm />
      </div>
    </Container>
  );
};

export default Resetpassword;
