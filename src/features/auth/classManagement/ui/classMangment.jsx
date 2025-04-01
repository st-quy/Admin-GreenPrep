import React, { useState, useEffect } from "react";
import CreateClass from "../createClass";
import UpdateClass from "../updateClass";
import { Button } from "antd";
import { fetchClasses, deleteClass, fetchSessionsByClassId } from "../services/classAPI";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch classes from API
  useEffect(() => {
    const loadClasses = async () => {
      try {
        setLoading(true);
        const fetchedClasses = await fetchClasses();
        const classesWithSessions = await Promise.all(
          fetchedClasses.map(async (cls) => {
            const sessions = await fetchSessionsByClassId(cls.id);
            return { ...cls, sessions: sessions.length };
          })
        );
        setClasses(classesWithSessions);
      } catch (err) {
        setError("Failed to load classes. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const handleUpdateClass = (updatedClass) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === updatedClass.id ? { ...cls, ...updatedClass } : cls
      )
    );
  };

  if (loading) {
    return <div className="p-6">Loading classes...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-[4px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Class Management</h1>
          <CreateClass onAddClass={handleAddClass} existingClasses={classes} />
        </div>
        <p className="text-gray-600 mb-6">
          Manage and organize both classes and individual sessions.
        </p>
        <div className="bg-[#F8FAFC] rounded-[4px] overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CLASS NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NUMBER OF SESSIONS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {classes.map((classItem) => (
                <tr key={classItem.id} className="border-b border-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#0B3B6A] hover:underline cursor-pointer">
                      {classItem.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{classItem.sessions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <UpdateClass
                        classData={classItem}
                        onUpdateClass={handleUpdateClass}
                        existingClasses={classes}
                      />
                      <Button
                        className="hover:!border-[#D0D5DD]"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 19 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9904 7.75L11.6442 16.75M6.85577 16.75L6.50962 7.75M16.4776 4.54057C16.8196 4.59222 17.1604 4.64747 17.5 4.70629M16.4776 4.54057L15.4098 18.4226C15.3196 19.5948 14.3421 20.5 13.1664 20.5H5.33357C4.15786 20.5 3.18037 19.5948 3.0902 18.4226L2.02235 4.54057M16.4776 4.54057C15.3312 4.36744 14.1715 4.23485 13 4.14432M1 4.70629C1.33957 4.64747 1.68037 4.59222 2.02235 4.54057M2.02235 4.54057C3.16878 4.36744 4.32849 4.23485 5.5 4.14432M13 4.14432V3.22819C13 2.04882 12.0893 1.06423 10.9106 1.02652C10.3592 1.00889 9.80565 1 9.25 1C8.69435 1 8.14078 1.00889 7.58942 1.02652C6.41065 1.06423 5.5 2.04882 5.5 3.22819V4.14432M13 4.14432C11.7626 4.0487 10.512 4 9.25 4C7.98803 4 6.73744 4.0487 5.5 4.14432"
                            stroke="#E10E0E"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
