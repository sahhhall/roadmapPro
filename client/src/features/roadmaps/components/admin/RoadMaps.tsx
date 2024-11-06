import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetRoadmapsByStatusQuery,
  useListUnlistRoadmapMutation,
} from "@/features/roadmaps/services/api/roadmapApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, MapPin } from "lucide-react";
import Container from "@/components/Container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const clientBaseUrl = import.meta.env.VITE_BASE_CLIENT_URL;
const RoadMaps = () => {
  const [statusFilter, setStatusFilter] = useState("published");
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useGetRoadmapsByStatusQuery({ status: statusFilter });
  const [listUnlistRoadmap] = useListUnlistRoadmapMutation();
  useEffect(() => {
    refetch();
  }, [statusFilter]);

  const openRoadmapInNewTab = (id: string) => {
    const url = `${clientBaseUrl}/roadmap/${id}`;
    window.open(url, "_blank");
  };
  const handleListUnlist = async (roadmapId: string) => {
    try {
      await listUnlistRoadmap({ roadmapId: roadmapId }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update roadmap status:", error);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading </div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading roadmaps
      </div>
    );

  return (
    <Container className="mx-auto px-7 py-8">
      <div className="mb-6">
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((roadmap) => (
          <Card
            key={roadmap.id}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl">{roadmap.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                <div className="flex items-center mt-2">
                  <User size={16} className="mr-2" />
                  <span>Created by: sahhhall</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-700 dark:text-white">
                {roadmap.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                onClick={() => openRoadmapInNewTab(roadmap.id)}
                variant="outline"
                className="flex items-center"
              >
                <MapPin size={16} className="mr-2" />
                View Roadmap
              </Button>
              {roadmap.status === "published" && (
                <Button
                  variant={"destructive"}
                  onClick={() => handleListUnlist(roadmap.id)}
                >
                  {roadmap.isActive ? "Unlist" : "List"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default RoadMaps;
