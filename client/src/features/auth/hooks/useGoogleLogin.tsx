
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface CredentialPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}
export const useGoogleLogin = () => {
  const handleSuccess = (response: CredentialResponse) => {
    try {
      const credentials: CredentialPayload = jwtDecode(
        response.credential as string
      );
      console.log(credentials);
    } catch (error) {
      console.error("Failed to decode JWT", error);
    }
  };

  const handleError = (error: any) => {
    console.error("Google login failed", error);
  };

  return {
    handleSuccess,
    handleError,
  };
};
