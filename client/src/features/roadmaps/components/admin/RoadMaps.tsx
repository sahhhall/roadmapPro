import { Button } from "@/components/ui/button";
import {
  useGetRoadmapsByStatusQuery,
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
import { useEffect } from "react";

const RoadMaps = () => {
  const { data = [], isLoading, error,refetch } = useGetRoadmapsByStatusQuery({status:'published'});
  useEffect(()=> {
    refetch()
  },[])
  if (isLoading)
    return <div className="text-center py-10">Loading roadmaps...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading roadmaps
      </div>
    );

  return (
    <Container className=" mx-auto px-7 py-8">
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
              <p className=" text-xs text-gray-700 dark:text-white">
                {roadmap.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="outline" className="flex items-center">
                <MapPin size={16} className="mr-2" />
                View Roadmap
              </Button>
              <Button variant="destructive">Unlist</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default RoadMaps;
