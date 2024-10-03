import axiosInstance from "@/services/axiosConfig";
import { useState } from "react";
import { SignupData } from "../types/auth";
import { LoaderCircle } from "lucide-react";

export interface RequestHookProps {
  path: string;
  method: "get" | "post" | "put" | "delete";
  onSuccess?: (data: any) => void;
}
export default ({ path, method, onSuccess }: RequestHookProps) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState<null | any>(null);
  const doRequest = async (data: SignupData) => {
    try {
      setErrors(null);
      setLoading(<LoaderCircle className="animate-spin" />);
      const response = await axiosInstance[method](path, data);
      setLoading(null);
      if (onSuccess) {
        onSuccess(data);
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message ||
        "An unexpected error occurred";
      return {
        success: false,
        error: {
          status: err.response?.status || 500,
          message: errorMessage,
        },
      };
    } finally {
      setLoading(null);
    }
  };

  return { doRequest, errors, loading };
};
