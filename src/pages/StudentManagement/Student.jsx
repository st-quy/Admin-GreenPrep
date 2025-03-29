import SearchInput from "@app/components/SearchInput";
import Details from "@features/auth/ui/DetailsManagement/Details";
import StudentMonitoring from "@features/session/ui/student-modering";
import React, { useState } from "react";

const Student = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div>
      <Details type="student" />
      <div className="flex justify-between mb-10">
        <div>
          <p className="text-[30px] text-black font-bold">Student Monitoring</p>
          <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
            Track student request and participation.
          </p>
        </div>
      </div>
      <SearchInput 
      placeholder="Search by session name"
      onSearchChange={onSearchChange}
      />
      <StudentMonitoring searchKeyword={searchKeyword} />
    </div>
  );
};

export default Student;
