import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import "./index.scss";
import StudentMonitoring from "@features/session/ui/StudentModering";
import StudentSessionTable from "@/features/session/ui/StudentSessionTable.jsx";
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@pages/SessionManagement/Details/Details.jsx";
import { useParams, useNavigate } from "react-router-dom";

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
            <div className="bg-redDark w-[13px] h-[13px] absolute md:top-4 top-1 md:right-6 right-1 rounded-full"></div>
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
    <div className="session-container flex flex-col p-8">
      <Details type={type} id={id} />

      <div className="">
        <div className="flex justify-between">
          <div>
            <p className="md:text-[30px] text-[20px] text-black font-bold">
              Student Monitoring
            </p>
            <p className="md:text-[18px] text-[12px] text-[#637381] font-medium mt-[10px]">
              Track student request and participation.
            </p>
          </div>
          <div>
            {buttonState === "publishScore" && (
              <button
                className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full md:px-[28px] px-[18px] md:py-[13px] py-[7px] md:text-base text-xs border-none"
                disabled
              >
                Publish Score
              </button>
            )}
            {buttonState === "readyToPublish" && (
              <button
                className="bg-secondaryColor text-white font-bold rounded-full md:px-[28px] px-[18px] md:py-[13px] py-[7px] md:text-base text-xs border-none"
                onClick={handlePublishScore}
              >
                Ready to Publish
              </button>
            )}
            {buttonState === "publishedScore" && (
              <button
                className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full md:px-[28px] px-[18px] md:py-[13px] py-[7px] md:text-base text-xs border-none"
                disabled
              >
                Published
              </button>
            )}
          </div>
        </div>
        <div className="md:mt-[34px] mt-[20px]">
          <SearchInput
            placeholder="Search by name"
            onSearchChange={onSearchChange}
            className="absolute z-10"
          />
        </div>
        <Tabs defaultActiveKey="item-1" items={items}/>
      </div>
    </div>
  );
};

export default SessionInformation;
