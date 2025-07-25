import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StudentData } from "../types";
import StudentDataTemplate from "../public/StudentDataTemplate.json";

const LoginPage: React.FC = () => {
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const trimmedRegNo = regNo.trim();

    if (trimmedRegNo === "") {
      alert("Register number cannot be empty.");
      return;
    }

    const allData = JSON.parse(localStorage.getItem("StudentCGPA") || "{}");

    if (!allData[trimmedRegNo]) {
      const template: StudentData = {
        ...StudentDataTemplate,
        reg_no: trimmedRegNo,
      };
      allData[trimmedRegNo] = template;
      localStorage.setItem("StudentCGPA", JSON.stringify(allData));
    }

    localStorage.setItem("loggedInRegNo", trimmedRegNo);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen space-y-4">
      <h1 className="text-2xl font-bold">Student CGPA Calculator</h1>
      <input
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        placeholder="Enter Register Number"
        className="border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        disabled={regNo.trim() === ""}
        className={`px-4 py-2 rounded text-white transition-colors duration-200 ${
          regNo.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;