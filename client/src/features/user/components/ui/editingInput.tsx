import React from "react";

interface IEditingInputProps {
  type: "text" | "number" | "textarea";
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (name: string, value: any) => any;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const EditingInput: React.FC<IEditingInputProps> = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
}) => {
  if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => onBlur(name, value)}
        onKeyDown={onKeyDown}
        className="w-full overflow-hidden bg-transparent border dark:text-gray-400  text-gray-600 text-sm  rounded-md p-2 focus:outline-none focus:border-blue-500"
        rows={4}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={() => onBlur(name, value)}
      onKeyDown={onKeyDown}
      className="w-full text-gray-600 text-xs dark:text-gray-400 bg-transparent border-b focus:outline-none"
      autoFocus
    />
  );
};

export default EditingInput;
