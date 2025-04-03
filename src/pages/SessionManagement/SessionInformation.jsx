import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import "./index.scss";
import StudentMonitoring from "@features/session/ui/StudentModering";
import StudentSessionTable from "@/features/session/ui/StudentSessionTable.jsx";
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@pages/SessionManagement/Details/Details.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { TableType } from "@features/session/constraint/TableEnum";

const SessionInformation = ({ type }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { id, studentId } = useParams();
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  const handlePendingCountChange = (count) => {
    setPendingCount(count);
  };
  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
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
      forceRender: true,
    },
  ];

  const [buttonState, setButtonState] = useState("readyToPublish");

  const handlePublishScore = () => {
    setButtonState("publishedScore");
  };

  return (
    <div className=" session-container flex flex-col p-8">
      <Details type={type} id={type == TableType.SESSION ? id : studentId} />

      <div className="">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] text-black font-bold">
              {type == TableType.SESSION
                ? "Student Monitoring"
                : "Assessment History"}
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
            placeholder="Search by name, class"
            onSearchChange={onSearchChange}
            className={` ${type == TableType.SESSION ? "absolute z-10" : "mb-8"}`}
          />
        </div>
        {type == TableType.SESSION ? (
          <Tabs defaultActiveKey="item-1" items={items} />
        ) : (
          <StudentSessionTable
            searchKeyword={searchKeyword}
            type={type}
            id={studentId}
          />
        )}
      </div>
    </div>
  );
};

export default SessionInformation;
