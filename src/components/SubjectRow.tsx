import React from "react";
import type { Subject } from "../types";
import GradeDropdown from "./GradeDropdown";

interface SubjectRowProps {
  subject: Subject;
  onGradeChange: (grade: Subject["grade"]) => void;
  onDelete?: () => void;
  isElective?: boolean;
}

const SubjectRow: React.FC<SubjectRowProps> = ({
  subject,
  onGradeChange,
  onDelete,
  isElective = false,
}) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-base-100 shadow-sm mb-2">
      <div className="flex flex-col">
        <span className="font-semibold">{subject.sub_name}</span>
        <span className="text-xs text-gray-500">{subject.category}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-700">Credits: {subject.credit}</div>
        <GradeDropdown
          value={subject.grade ?? ""}
          onChange={(newGrade) => onGradeChange(newGrade as Subject["grade"])}
        />
        {isElective && onDelete && (
          <button
            onClick={onDelete}
            className="btn btn-sm btn-error btn-outline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default SubjectRow;
