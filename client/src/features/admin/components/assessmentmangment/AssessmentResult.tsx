import { useEffect, useState } from "react";
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
import { useGetTestsByResultQuery } from "@/features/assessment/services/api/assessementApi";
import { dateFormatter } from "@/lib/formatters";
import { AssessmentResultModal } from "../modal/AssessmentResultModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssessmentResultTable = () => {
  const [filter, setFilter] = useState("");
  const [detailDialogOpen, setDetailsDialogOpen] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const openDialog = () => setDetailsDialogOpen(true);

  const {
    data: assessmentResults,
    isLoading,
    refetch,
  } = useGetTestsByResultQuery({
    result: filter,
  });
  useEffect(() => {
    refetch();
  }, []);

  //it for handle refetach
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
    return <div className="p-4">wait vro..</div>;
  }
  const handleRowClick = (result: any) => {
    setSelectedResult(result);
    openDialog();
  };
  return (
    <div className="p-4">
      <div className="flex justify-end  gap-3 items-center mb-6">
        <Input placeholder="search results.." className="w-[300px]" />
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              setFilter("");
              return;
            }
            setFilter(value);
          }}
        >
          <SelectTrigger  className="w-[100px]">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            {["all", "pending", "failed", "passed"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableCaption>A list of users assessment results.</TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-black dark:border">
          <TableRow>
            <TableHead>UserId</TableHead>
            <TableHead>Stack</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentResults?.map((result) => (
            <TableRow
              key={result.id}
              onClick={() => handleRowClick(result)}
              className="cursor-pointer "
            >
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
      <AssessmentResultModal
        selectedResult={selectedResult}
        dialogOpen={detailDialogOpen}
        setDialogOpen={setDetailsDialogOpen}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default AssessmentResultTable;
