import axiosInstance from "@/services/axiosConfig";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export interface RequestHookProps {
  path: string;
  method: "get" | "post" | "put" | "delete";
  onSuccess?: (data: any) => void;
}
export default ({ path, method, onSuccess }: RequestHookProps) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState<null | any>(null);
  const doRequest = async (data: any) => {
    try {
      setErrors(null);
      setLoading(<LoaderCircle className="animate-spin" />);
      console.log(method, path, data);
      const response = await axiosInstance[method](path, data);
      setLoading(null);
      if (onSuccess) {
        onSuccess(response);
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.message ||
        err?.response?.data.message ||
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
