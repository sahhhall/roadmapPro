import { Handle } from "@xyflow/react";

const CustomHandler = ({ type, position, color = "blue" }: any) => {
  return (
    <Handle
      type={type}
      position={position}
      style={{
        background: color,
        borderRadius: "50%",
        width: "1px",
        height: "1px",
        border: ".4px solid white", 
       
      }}
    />
  );
};

export default CustomHandler;
