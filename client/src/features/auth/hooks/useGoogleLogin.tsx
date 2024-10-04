import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import useAuthRequest from "./useAuthRequest";
import { userRoutes } from "../services/endpoints";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/useAppStore";
import { login } from "@/redux/slices/authSlice";

interface CredentialPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { doRequest, loading } = useAuthRequest({
    path: userRoutes.googleLogin,
    method: "post",
    onSuccess: (response) => {
      dispatch(login(response.data.user));
      navigate("/");
      toast({
        description: `Welcome, ${response.data.user.name}!`,
      });
    },
  });

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      const credentials: CredentialPayload = jwtDecode(response.credential);

      const result = await doRequest({
        name: credentials.name,
        email: credentials.email,
        avatar: credentials.picture,
      });

      if (!result.success) {
        throw new Error(
          result.error?.message || "Failed to authenticate with the server"
        );
      }
    } catch (error) {
      console.error("Google login failed", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  const handleError = (error: any) => {
    console.error("Google login failed", error);
    toast({
      variant: "destructive",
      title: "Google Login Failed",
      description: "Unable to authenticate with Google. Please try again.",
    });
  };

  return {
    handleSuccess,
    handleError,
    loading,
  };
};
