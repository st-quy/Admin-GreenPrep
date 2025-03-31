import React, {useState} from "react";
import { Tabs, Input } from "antd";
import "./index.css";
import StudentMonitoring from "@/features/session/ui/student-modering.jsx";
const { Search } = Input;
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@features/auth/ui/Details/Details";

const SessionInformation = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const items = [
    {
      label: "Participant List",
      key: "item-1",
      children: <StudentMonitoring searchKeyword={searchKeyword} />,
    },
    {
      label: "Pending Request",
      key: "item-2",
      children: <StudentMonitoring searchKeyword={searchKeyword} />,
    },
  ];

  const [buttonState, setButtonState] = React.useState("readyToPublish");

  const handlePublishScore = () => {
    setButtonState("publishedScore");
  };

  return (
    <div className="flex flex-col">

      <Details type="session"/>

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
              <button className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none">
                Published Score
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-[69px]">
          <SearchInput
          placeholder="Search by student name or class"
          onSearchChange={onSearchChange}
          className="absolute z-10"
          />
          <Tabs items={items} className="flex-1 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SessionInformation;
