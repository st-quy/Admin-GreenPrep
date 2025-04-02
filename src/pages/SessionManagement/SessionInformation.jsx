import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import "./index.css";
import StudentMonitoring from "@features/session/ui/StudentModering";
import StudentSessionTable from "@/features/session/ui/StudentSessionTable.jsx";
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@pages/SessionManagement/Details/Details.jsx";
import { FilterFilled } from "@ant-design/icons";
import { TableType } from "@features/session/constraint/TableEnum";
import { useParams, useNavigate } from "react-router-dom";

const SessionInformation = ({ type }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { id } = useParams();
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  const handlePendingCountChange = (count) => {
    setPendingCount(count);
  };
  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleStudentNavigate = (id, action) => {
    navigate(`/class/session/student/${id}`);
  };
  const items = [
    {
      label: "Participant List",
      key: "item-1",
      children: (
        <StudentSessionTable
          searchKeyword={searchKeyword}
          type={type}
          id={id}
          onStudentClick={handleStudentNavigate}
          onNavigate={() => {}}
        />
      ),
    },
    {
      label: (
        <span className="relavtive">
          Pending Request
          {pendingCount > 0 && (
            <div className="bg-redDark w-[13px] h-[13px] absolute top-4 right-6 rounded-full"></div>
          )}
        </span>
      ),
      key: "item-2",
      children: (
        <StudentMonitoring
          sessionId={id}
          searchKeyword={searchKeyword}
          onPendingCountChange={handlePendingCountChange}
        />
      ),
    },
  ];

  const [buttonState, setButtonState] = useState("readyToPublish");

  const handlePublishScore = () => {
    setButtonState("publishedScore");
  };

  return (
    <div className="flex flex-col">
      <Details type={type} id={id} />

      <div className="">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] text-black font-bold">
              Student Monitoring
            </p>
            <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
              Track student request and participation.
            </p>
          </div>
          <div>
            {buttonState === "publishScore" && (
              <button
                className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none"
                disabled
              >
                Publish Score
              </button>
            )}
            {buttonState === "readyToPublish" && (
              <button
                className="bg-secondaryColor text-white font-bold rounded-full px-[28px] py-[13px] text-base border-none"
                onClick={handlePublishScore}
              >
                Ready to Publish
              </button>
            )}
            {buttonState === "publishedScore" && (
              <button
                className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none"
                disabled
              >
                Published
              </button>
            )}
          </div>
        </div>
        <div className="mt-[34px]">
          <SearchInput
            placeholder="Search by name, class,..."
            onSearchChange={onSearchChange}
            className="absolute z-10"
          />
        </div>
        <Tabs defaultActiveKey="item-1" items={items} />
      </div>
    </div>
  );
};

export default SessionInformation;
