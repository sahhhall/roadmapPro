export const getAccessStyle = (access: string) => {
    switch (access) {
      case "admin":
        return "bg-red-100 text-xs border-red-300 border px-4 text-red-600 rounded-full ";
      case "mentor":
        return "bg-green-100 text-xs border-green-300 border px-4 text-green-600 rounded-full";
      case "user":
        return "bg-blue-100 text-xs border-blue-300 border px-4 text-blue-600 rounded-full ";
      default:
        return "bg-green-100 text-xs border-green-300 border px-4 text-green-600 rounded-full "; 
    }
  };
  