import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StudentData } from "../types";

const LoginPage: React.FC = () => {
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const allData = JSON.parse(localStorage.getItem("StudentCGPA") || "{}");

    if (!allData[regNo]) {
      const template: StudentData = {
        reg_no: regNo,
        cgpa: 0,
        credits: 0,
        overall_credits: 0,
        sems: {},
      };
      allData[regNo] = template;
      localStorage.setItem("StudentCGPA", JSON.stringify(allData));
    }

    localStorage.setItem("loggedInRegNo", regNo);
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
