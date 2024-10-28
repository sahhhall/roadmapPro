import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AvatarFallback } from "@radix-ui/react-avatar";

const AssessmentResultTable = () => {
  const assessmentResults = [
    {
      id: "1",
      studentName: "John Doe",
      email: "john.doe@example.com",
      avatar: "/api/placeholder/32/32",
      assessmentName: "JavaScript Basics",
      score: 85,
      status: "Passed",
      completionTime: "45 minutes",
      submittedAt: "2024-03-15",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/api/placeholder/32/32",
      assessmentName: "React Fundamentals",
      score: 92,
      status: "Passed",
      completionTime: "38 minutes",
      submittedAt: "2024-03-14",
    },
    {
      id: "3",
      studentName: "Alice Johnson",
      email: "alice.j@example.com",
      avatar: "/api/placeholder/32/32",
      assessmentName: "JavaScript Basics",
      score: 65,
      status: "Failed",
      completionTime: "50 minutes",
      submittedAt: "2024-03-13",
    },
    {
      id: "4",
      studentName: "Bob Wilson",
      email: "bob.w@example.com",
      avatar: "/api/placeholder/32/32",
      assessmentName: "React Fundamentals",
      score: 78,
      status: "Passed",
      completionTime: "42 minutes",
      submittedAt: "2024-03-12",
    },
  ];

  const getScoreStyle = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm";
    if (score >= 75) return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm";
    return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm";
  };

  const getStatusStyle = (status) => {
    return status === "Passed" 
      ? "text-green-500 font-medium"
      : "text-red-500 font-medium";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Input placeholder="Search students..." className="w-[300px]" />
      </div>

      <Table>
        <TableCaption>A list of student assessment results.</TableCaption>
        <TableHeader className="bg-gray-100 dark:bg-black dark:border">
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time Taken</TableHead>
            <TableHead>Submission Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={result.avatar} />
                    <AvatarFallback>{result.studentName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{result.studentName}</span>
                    <span className="text-gray-500 text-xs">{result.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{result.assessmentName}</TableCell>
              <TableCell>
                <span className={getScoreStyle(result.score)}>
                  {result.score}%
                </span>
              </TableCell>
              <TableCell>
                <span className={getStatusStyle(result.status)}>
                  {result.status}
                </span>
              </TableCell>
              <TableCell>{result.completionTime}</TableCell>
              <TableCell>{result.submittedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssessmentResultTable;