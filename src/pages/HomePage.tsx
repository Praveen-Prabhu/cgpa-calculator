import React, { useEffect, useState } from "react";
import SemesterCard from "../components/SemesterCard";
import Header from "../components/Header";
import { calculateCGPA, calculateGPA } from "../utils";
import type { StudentData, Semester, Subject } from "../types";
import ElectiveSubjects from "../public/ElectiveSubjects.json";

const MainPage: React.FC = () => {
  const regNo = localStorage.getItem("loggedInRegNo") || "";
  const allData = JSON.parse(localStorage.getItem("StudentCGPA") || "{}");
  const [studentData, setStudentData] = useState<StudentData>(allData[regNo]);

  useEffect(() => {
    const updated: StudentData = {
      ...studentData,
      cgpa: calculateCGPA(studentData.sems),
      credits: Object.values(studentData.sems)
        .filter((sem) => sem.enabled)
        .reduce((acc, sem) => acc + sem.credits, 0),
    };

    setStudentData(updated);
    allData[regNo] = updated;
    localStorage.setItem("StudentCGPA", JSON.stringify(allData));
  }, [studentData.sems]);

  const handleGradeChange = (
    semNo: number,
    index: number,
    grade: Subject["grade"]
  ) => {
    const updated: StudentData = {
      ...studentData,
      sems: {
        ...studentData.sems,
        [semNo]: {
          ...studentData.sems[semNo],
          subjects: [...studentData.sems[semNo].subjects],
        },
      },
    };

    updated.sems[semNo].subjects[index].grade = grade;

    const { gpa } = calculateGPA(updated.sems[semNo].subjects);
    updated.sems[semNo].gpa = gpa;

    updated.sems[semNo].credits = updated.sems[semNo].subjects
      .filter((s) => s.grade && s.grade !== "U")
      .reduce((acc, sub) => acc + sub.credit, 0);

    setStudentData(updated);
  };

  const handleToggleSemester = (semNo: number, enabled: boolean) => {
    const updated: StudentData = {
      ...studentData,
      sems: {
        ...studentData.sems,
        [semNo]: {
          ...studentData.sems[semNo],
          enabled,
        },
      },
    };
    setStudentData(updated);
  };

  const [allElectivesList, setAllElectivesList] = useState<Subject[]>(
    ElectiveSubjects.subjects
  );
  const handleAddElective = (semNo: number, subject: Subject) => {
    const updated = { ...studentData };
    const semKey = String(semNo);

    updated.sems[semKey].subjects.push({ ...subject });
    setStudentData(updated);

    setAllElectivesList((prev) =>
      prev.filter((s) => s.sub_name !== subject.sub_name)
    );
  };

  const handleDeleteElective = (semNo: number, index: number) => {
    const subjectsCopy = [...studentData.sems[semNo].subjects];
    const deletedSubject = subjectsCopy[index];
    subjectsCopy.splice(index, 1);

    const updated: StudentData = {
      ...studentData,
      sems: {
        ...studentData.sems,
        [semNo]: {
          ...studentData.sems[semNo],
          subjects: subjectsCopy,
        },
      },
    };

    if (
      ElectiveSubjects.subjects.some(
        (s) => s.sub_name === deletedSubject.sub_name
      )
    ) {
      setAllElectivesList((prev) => [...prev, deletedSubject]);
    }

    setStudentData(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInRegNo");
    window.location.href = "/login";
  };

  return (
    <div className="p-4 space-y-4">
      <Header studentId={regNo} data={studentData} onLogout={handleLogout} />

      {Object.entries(studentData.sems).map(
        ([semKey, semester]: [string, Semester]) => (
          <SemesterCard
            key={semKey}
            semester={semester}
            onToggle={(enabled) =>
              handleToggleSemester(semester.sem_no, enabled)
            }
            onGradeChange={(index, grade) =>
              handleGradeChange(semester.sem_no, index, grade)
            }
            onAddElective={(subject) =>
              handleAddElective(semester.sem_no, subject)
            }
            onDeleteElective={(index) =>
              handleDeleteElective(semester.sem_no, index)
            }
            availableElectives={allElectivesList}
          />
        )
      )}
    </div>
  );
};

export default MainPage;
