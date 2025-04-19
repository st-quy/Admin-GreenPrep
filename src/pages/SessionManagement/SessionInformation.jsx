import React, { useState } from "react";
import { Tabs, message } from "antd";
import "@features/session/css/index.scss";
import StudentMonitoring from "@features/session/ui/StudentModering";
import StudentSessionTable from "@/features/session/ui/StudentSessionTable.jsx";
import SearchInput from "@/app/components/SearchInput.jsx";
import Details from "@features/session/ui/Details.jsx";
import { useParams } from "react-router-dom";
import { TableType } from "@features/session/constant/TableEnum";
import { usePublishScoresAndSendEmails } from "@features/session/hooks/useSession";

const SessionInformation = ({ type }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { sessionId, studentId } = useParams();
  const [pendingCount, setPendingCount] = useState(0);
  const [isReadyToPublish, setIsReadyToPublish] = useState(false);
  const [participants, setParticipants] = useState([]);
  const { mutate: publishScores, isPending } = usePublishScoresAndSendEmails(
    () => {
      message.success("Email sent successfully!");
    }
  );

  const handleAllGraded = (data) => {
    setParticipants(data);
    setIsReadyToPublish(true);
  };

  const handlePendingCountChange = (count) => {
    setPendingCount(count);
  };

  const onSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handlePublishScore = () => {
    console.log("Sending emails to participants:", participants);
    // @ts-ignore
    publishScores(participants);
    setIsReadyToPublish(false);
  };

  const items = [
    {
      label: "Participant List",
      key: "item-1",
      children: (
        <StudentSessionTable
          id={sessionId}
          studentId={studentId}
          type={type}
          searchKeyword={searchKeyword}
          onAllQuestionGraded={handleAllGraded}
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
          sessionId={sessionId}
          searchKeyword={searchKeyword}
          onPendingCountChange={handlePendingCountChange}
        />
      ),
      forceRender: true,
    },
  ];

  return (
    <div className="session-container flex flex-col p-2 md:p-8">
      <Details
        type={type}
        id={type == TableType.SESSION ? sessionId : studentId}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] text-black font-bold">
              {type == TableType.SESSION
                ? "Student Monitoring"
                : "Assessment History"}
            </p>
            <p className="text-[18px] text-primaryTextColor font-medium mt-[10px]">
              {type == TableType.SESSION
                ? "Track student request and participation."
                : "Overview of Past Performance."}
            </p>
          </div>
          {type === TableType.SESSION && (
            <div>
              <button
                className={`font-bold rounded-full transition-all duration-150 ease-in-out
    md:px-[28px] px-[18px] md:py-[13px] py-[7px] 
    md:text-base text-xs border-none transform 
    ${
      isReadyToPublish
        ? "bg-secondaryColor text-white hover:bg-[#3b82f6] active:scale-95"
        : "bg-[#E5E7EB] text-[#6B7280] "
    } 
    ${isPending ? "cursor-not-allowed opacity-60" : "hover:scale-105"}
  `}
                onClick={handlePublishScore}
                disabled={!isReadyToPublish || isPending}
              >
                {isPending
                  ? "Sending..."
                  : isReadyToPublish
                    ? "Ready to Publish"
                    : "Publish Score"}
              </button>
            </div>
          )}
        </div>
        <div className="md:mt-[34px] mt-[20px]">
          <SearchInput
            placeholder="Search by name"
            onSearchChange={onSearchChange}
            className={` ${type == TableType.SESSION ? "absolute z-10" : "mb-8"}`}
          />
        </div>
        <div className={`${type == TableType.SESSION && "h-[500px]"}`}>
          {type == TableType.SESSION ? (
            <Tabs defaultActiveKey="item-1" items={items} />
          ) : (
            <StudentSessionTable
              id={sessionId}
              studentId={studentId}
              type={type}
              searchKeyword={searchKeyword}
              onAllQuestionGraded={handleAllGraded}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionInformation;
