import { useParams } from "react-router-dom";
import { useGetRoadMapByIDQuery } from "../services/api/roadmapApi";

const RoadmapUserView = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id,"idididid")
  const { data } = useGetRoadMapByIDQuery(id as string);
  console.log(data);
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description }</p>
    </div>
  );
};

export default RoadmapUserView;
