import { Position } from "@xyflow/react";
import CustomHandler from "../CustomHandler";

export const UserViewTopic = ({ data }: any) => {
  return (
    <>
      <CustomHandler type="target" position={Position.Top} />
        <div style={{ ...data.style }} className="text-center ">
        <label htmlFor="text">{data.label}</label>
       </div>
      <CustomHandler type="source" position={Position.Bottom} />
    </>
  );
};
