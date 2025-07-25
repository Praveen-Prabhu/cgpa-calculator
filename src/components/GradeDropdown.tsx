import React from "react";

interface GradeDropdownProps {
  value: string;
  onChange: (newGrade: string) => void;
  disabled?: boolean;
  id?: string;       
  name?: string;     
}

const grades = ["O", "A+", "A", "B+", "B", "U"];

const GradeDropdown: React.FC<GradeDropdownProps> = ({
  value,
  onChange,
  disabled = false,
  id = "grade-select",
  name = "grade",
}) => {
  return (
    <select
      id={id}
      name={name}
      className="w-26 px-3 py-2 text-sm rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-0 border-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">--Select--</option>
      {grades.map((grade) => (
        <option key={grade} value={grade}>
          {grade}
        </option>
      ))}
    </select>
  );
};

export default GradeDropdown;
