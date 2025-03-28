import React from "react";
import { Tabs } from "antd";
import "./index.css";
import Content1 from "./test.jsx";
import { Input } from "antd";
const { Search } = Input;

const SessionInformation = () => {
  const onSearch = (value) => {
    console.log("Search text:", value);
  };
  const items = [
    { label: "Participant List", key: "item-1", children: "Content 1" },
    { label: "Pending Request", key: "item-2", children: <Content1 /> },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-[30px] text-black font-bold">Session Information</p>
      <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
        View session details.
      </p>
      <div className="w-full flex justify-between columns-2 bg-white rounded-lg p-16 mt-[34px] shadow-md">
        <div className="w-full flex columns-2 text-left text-base">
          <div className="w-2/4 flex flex-col">
            <p className="text-[#637381] font-medium m-[15px]">Session Name</p>
            <p className=" text-[#637381] font-medium m-[15px]">
              Number of participants
            </p>
            <p className=" text-[#637381] font-medium m-[15px]">Session Date</p>
          </div>
          <div className="flex flex-col">
            <p className=" text-black font-semibold m-[15px]">SESSION 1</p>
            <p className=" text-black font-semibold m-[15px]">50</p>
            <p className=" text-black font-semibold m-[15px]">
              12/12/2021 9:00
            </p>
          </div>
        </div>
        <div className="w-full flex columns-2 text-left text-base">
          <div className="w-2/4 flex flex-col">
            <p className="text-[#637381] font-medium m-[15px]">Session key</p>
            <p className=" text-[#637381] font-medium m-[15px]">Status</p>
            <p className=" text-[#637381] font-medium m-[15px]">End time</p>
          </div>
          <div className="flex flex-col">
            <p className=" text-black font-semibold m-[15px]">KEY 001</p>
            <div className="px-[10px] py-[3px] bg-[#DAF8E6] flex items-center justify-center rounded-full text-[#1A8245] font-medium m-[12px]">
              Completed
            </div>
            <p className=" text-black font-semibold m-[15px]">
              12/12/2021 11:00
            </p>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-opacity-50 bg-black border-0"></hr>
      <div className="">
        <div className="flex justify-between">
          <div>
            <p className="text-[30px] text-black font-bold">
              Student Monitoring
            </p>
            <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
              Track student request and paticipation.
            </p>
          </div>
          <div>
            {/* <button className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none">
              Publish Score
            </button> */}
            <button className="bg-secondaryColor text-white font-bold rounded-full px-[28px] py-[13px] text-base border-none">
                Ready to Publish
            </button>
            {/* <button className="bg-[#E5E7EB] text-[#6B7280] font-bold rounded-full px-[28px] py-[13px] text-base border-none">
              Published Score
            </button> */}
          </div>
        </div>

        <div className="h-screen flex flex-col mt-[69px]">
          <Search placeholder="input search text" size="large" onSearch={onSearch} className="absolute w-[250px] h-[40px] shadow-md rounded-xl text-[#9CA3AF] z-10"/>
          <Tabs items={items} className="flex-1 w-full"/>
        </div>
      </div>
    </div>
  );
};

export default SessionInformation;
