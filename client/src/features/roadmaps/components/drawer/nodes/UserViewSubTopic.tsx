//type – specifye the type of handle
//source  initiate outgoing connsection from a node
//  target accecpt incoming
//postiion where the should handle appear
export const UserViewSubTopic = ({ data }: any) => {
  return (
    <>
      <div style={{ ...data.style }} className="text-center ">
        <label htmlFor="text">{data.label}</label>
      </div>
    </>
  );
};
