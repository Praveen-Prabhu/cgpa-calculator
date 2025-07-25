import React, { useState } from "react";
import type { Subject } from "../types";

interface AddElectiveFormProps {
  availableElectives: Subject[];
  alreadyAdded: Subject[];
  onAdd: (subject: Subject) => void;
}

const AddElectiveForm: React.FC<AddElectiveFormProps> = ({
  availableElectives,
  alreadyAdded,
  onAdd,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredElectives = availableElectives.filter(
    (elective) =>
      !alreadyAdded.some((subj) => subj.sub_name === elective.sub_name)
  );

  const handleAdd = () => {
    if (selectedIndex !== null) {
      onAdd(filteredElectives[selectedIndex]);
      setSelectedIndex(null);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <select
        className="select select-bordered select-sm text-sm rounded-md bg-base-200 text-base-content focus:outline-none focus:ring-0 border-none"
        value={selectedIndex ?? ""}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
      >
        <option value="" disabled>
          Add Subject
        </option>
        {filteredElectives.map((elective, index) => (
          <option key={elective.sub_name} value={index}>
            {elective.sub_name}
          </option>
        ))}
      </select>
      <button
        className="btn btn-sm btn-primary"
        onClick={handleAdd}
        disabled={selectedIndex === null}
      >
        Add
      </button>
    </div>
  );
};

export default AddElectiveForm;
