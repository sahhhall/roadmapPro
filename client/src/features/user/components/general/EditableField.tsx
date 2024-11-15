import { Pen } from "lucide-react";
import { FormDataa, FormErrors } from "../../types/general";

interface EditableFieldProps {
    fieldName: string;
    value: string;
    isEditing: boolean;
    formData: FormDataa;
    formErrors: FormErrors;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlurOn: (field: string) => void;
    handleSave: (fieldName: string, value: string) => void;
    setEditingField: (field: string | null) => void;
    className?: string;
    inputClassName?: string;
  }
  
  export const EditableField = ({
    fieldName,
    value,
    isEditing,
    formData,
    formErrors,
    handleInputChange,
    handleBlurOn,
    handleSave,
    setEditingField,
    className = "text-gray-600 text-xs dark:text-gray-400",
    inputClassName = "w-full text-gray-600 text-xs dark:text-gray-400 bg-transparent border-b focus:outline-none",
  }: EditableFieldProps) => {
    return (
      <div className="relative">
        {isEditing ? (
          <input
            type={fieldName === "expirience" ? "number" : "text"}
            name={fieldName}
            value={formData[fieldName as keyof FormDataa]}
            onChange={handleInputChange}
            onBlur={() => handleBlurOn(fieldName)}
            onKeyDown={(e) => e.key === "Enter" && handleSave(fieldName, formData[fieldName as keyof FormDataa])}
            className={inputClassName}
            autoFocus
          />
        ) : (
          <p className={`${className} group cursor-pointer`} onClick={() => setEditingField(fieldName)}>
            {value}
            <Pen className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity inline" />
          </p>
        )}
        {formErrors[fieldName as keyof FormErrors] && (
          <p className="text-red-500 text-xs">{formErrors[fieldName as keyof FormErrors]}</p>
        )}
      </div>
    );
  };