import React, { useState, useEffect } from "react";
import { Tabs, Input } from "antd";
import "./index.css";
import StudentMonitoring from "@/features/session/ui/student-modering.jsx";
import StudentSessionTable from "@/features/session/ui/StudentSessionTable.jsx";
const { Search } = Input;
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@features/auth/ui/Details/Details";

const SessionInformation = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pendingRequestData, setPendingRequestData] = useState([]);

  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const fetchPendingRequestData = async () => {
      const data = [
        { id: 1, name: "Request 1" },
        { id: 2, name: "Request 2" },
      ];
      setPendingRequestData(data);
    };

    fetchPendingRequestData();
  }, []);

  const items = [
    {
      label: "Participant List",
      key: "item-1",
      children: <StudentSessionTable searchKeyword={searchKeyword} type="session" />,
    },
    {
      label: (
        <span className="">
          Pending Request
          {pendingRequestData.length > 0 && (
            <span className="absolute top-3 right-7 w-[13px] h-[13px] bg-redDark rounded-full"></span>
          )}
        </span>
      ),
      key: "item-2",
      children: <StudentMonitoring searchKeyword={searchKeyword} />,
    },
  ];

  const [buttonState, setButtonState] = useState("readyToPublish");

  const handlePublishScore = () => {
    setButtonState("publishedScore");
  };

  return (
    <div className="flex flex-col">
      <Details type="session" id="5d3740d4-bc75-485e-9d72-a3448735c111" />

      <div className="">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] text-black font-bold">Student Monitoring</p>
            <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
              Track student request and participation.
            </p>
          </div>
          <div>
            {buttonState === "publishScore" && (
              <button className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none" disabled>
                Publish Score
              </button>
            )}
            {buttonState === "readyToPublish" && (
              <button className="bg-secondaryColor text-white font-bold rounded-full px-[28px] py-[13px] text-base border-none" onClick={handlePublishScore}>
                Ready to Publish
              </button>
            )}
            {buttonState === "publishedScore" && (
              <button className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none" disabled>
                Published
              </button>
            )}
          </div>
        </div>
        <div className="mt-[34px]">
          <SearchInput placeholder="Search by name, class,..." 
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
