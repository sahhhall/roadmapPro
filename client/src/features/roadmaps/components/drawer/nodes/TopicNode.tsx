import { Position } from "@xyflow/react";
import CustomHandler from "@/features/roadmaps/components/drawer/CustomHandler";
//type – specifye the type of handle
//source  initiate outgoing connsection from a node
//  target accecpt incoming
//postiion where the should handle appear
export function Topic({ data }: any) {
  return (
    <>
      <CustomHandler type="target" position={Position.Top} />
      <div style={{ ...data.style }} className="text-center ">
        <label htmlFor="text">{data.label}</label>
      </div>
      <CustomHandler type="source" position={Position.Bottom} />
    </>
  );
}
