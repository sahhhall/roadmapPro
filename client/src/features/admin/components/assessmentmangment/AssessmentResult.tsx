import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useLazyGetTestsByResultQuery } from "@/features/assessment/services/api/assessementApi";
import { dateFormatter } from "@/lib/formatters";

const AssessmentResultTable = () => {
  const [getTests, { data: assessmentResults, isLoading }] =
    useLazyGetTestsByResultQuery();

  useEffect(() => {
    getTests({ result: "" });
  }, []);

  const getScoreStyle = (percentage: string) => {
    if (percentage >= "80")
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm";
    if (percentage < "80")
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm";
  };

  const getStatusStyle = (result: string) => {
    return result === "passed"
      ? "text-green-500 font-medium"
      : result === "pending"
      ? "text-yellow-500 font-medium"
      : "text-red-500 font-medium";
  };

  if (isLoading) {
    return <div className="p-4">
      wait vro..
    </div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Input placeholder="search results.." className="w-[300px]" />
      </div>

      <Table>
        <TableCaption>A list of student assessment results.</TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-black dark:border">
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentResults?.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="font-medium">
                <span>{result.userId}</span>
              </TableCell>
              <TableCell>{result.stackId.name}</TableCell>
              <TableCell>
                <span className={getScoreStyle(result.percentage)}>
                  {result.percentage}%
                </span>
              </TableCell>
              <TableCell>
                <span className={getStatusStyle(result.result)}>
                  {result.result}
                </span>
              </TableCell>
              <TableCell>{dateFormatter(result.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssessmentResultTable;
