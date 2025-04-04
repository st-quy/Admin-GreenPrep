import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Details from "@pages/SessionManagement/Details/Details.jsx";
import StudentSessionTable from "@features/session/ui/StudentSessionTable.jsx";
import SearchInput from "@app/components/SearchInput.jsx";

const StudentDetail = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { id } = useParams();

  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="session-container flex flex-col p-8">
      <Details type="student" id={id} />

      <div>
        <p className="md:text-[30px] text-[20px] text-black font-bold">
          Student Monitoring
        </p>
        <p className="md:text-[18px] text-[12px] text-[#637381] font-medium mt-[10px]">
          Track student request and participation.
        </p>
      </div>

      <div className="md:mt-[34px] mt-[20px]">
        <SearchInput
          placeholder="Search by session name or level"
          onSearchChange={onSearchChange}
        />
      </div>

      <StudentSessionTable
        searchKeyword={searchKeyword}
        type="student"
        id={id}
      />
    </div>
  );
};

export default StudentDetail;
