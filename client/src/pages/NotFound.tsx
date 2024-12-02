import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen items-center flex flex-col  justify-center text-center px-4">
      <div className="mx-auto max-w-md ">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for seems not found.
        </p>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;