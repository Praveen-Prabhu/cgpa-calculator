import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import type { StudentData } from "../types";
import { calculateCGPA } from "../utils";

interface HeaderProps {
  studentId: string;
  data: StudentData;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ studentId, data, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    setCgpa(calculateCGPA(data.sems));
  }, [data]);

  return (
    <div className="w-full">
      <div className="navbar bg-white text-blue-900 shadow-md px-4 flex justify-between">
        <span className="text-xl font-bold">CGPA CALCULATOR</span>
        <div className="relative">
          <div
            tabIndex={0}
            className="flex items-center cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaUserCircle className="text-4xl" />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-md z-20">
              <div className="absolute top-[-10px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-3xl text-blue-800" />
                  <div>
                    <div className="text-l text-blue-800">{studentId}</div>
                  </div>
                </div>
              </div>
              {onLogout && (
                <div className="p-2">
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-2 py-2 hover:bg-gray-100 text-l text-red-600"
                  >
                    <FiLogOut className="text-3xl mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-900 text-white text-center py-2 text-lg font-bold">
        CGPA : {cgpa.toFixed(2)}
      </div>
    </div>
  );
};

export default Header;
