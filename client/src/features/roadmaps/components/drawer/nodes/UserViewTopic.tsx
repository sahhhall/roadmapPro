export const UserViewTopic = ({ data }: any) => {
  return (
    <>
      <div style={{ ...data.style }} className="text-center ">
        <label htmlFor="text">{data.label}</label>
      </div>
    </>
  );
};
