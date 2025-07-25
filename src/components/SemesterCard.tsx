import AddElectiveForm from "./AddElectiveForm";
import type { Semester, Subject } from "../types";
import SubjectRow from "./SubjectRow";

interface SemesterCardProps {
  semester: Semester;
  onToggle: (enabled: boolean) => void;
  onGradeChange: (index: number, newGrade: Subject["grade"]) => void;
  onAddElective: (subject: Subject) => void;
  onDeleteElective: (index: number) => void;
  availableElectives: Subject[]; // 👈 new
}

const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  onToggle,
  onGradeChange,
  onAddElective,
  onDeleteElective,
  availableElectives,
}) => {
  const { sem_no, enabled, subjects, gpa, credits } = semester;

  return (
    <div className="card bg-base-100 shadow-xl border border-gray-200 mb-6">
      <div className="card-body">
        <div className="flex justify-between items-center mb-3">
          <h2 className="card-title text-lg font-bold text-primary">
            Semester {sem_no}
          </h2>
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium">Include</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
            />
          </label>
        </div>

        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <SubjectRow
              key={index}
              subject={subject}
              onGradeChange={(grade) => onGradeChange(index, grade)}
              isElective={
                subject.category.toLowerCase().includes("elective") ||
                subject.category === "PE"
              }
              onDelete={() =>
                subject.category.toLowerCase().includes("elective") ||
                subject.category === "PE"
                  ? onDeleteElective(index)
                  : undefined
              }
            />
          ))}
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <AddElectiveForm
            availableElectives={availableElectives}
            alreadyAdded={subjects}
            onAdd={onAddElective}
          />
          <div className="text-sm text-gray-600">
            GPA:{" "}
            <span className="font-bold text-xl text-primary">
              {gpa.toFixed(2)}
            </span>{" "}
            | Credits:{" "}
            <span className="font-bold text-xl text-primary">{credits}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;