import React, { useState } from "react";
import SessionTable from "./SessionTable/SessionTable";
import ActionModal from "../SessionModal/ActionModal/ActionModal";
import { Input, Select } from "antd";
import { StatusEnum } from "@features/classDetail/constant/statusEnum";

const SessionManager = ({ data }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  return (
    <>
      <div className="flex w-full items-center justify-between pt-8">
        <div>
          <h4 className="font-[700] md:text-[28px] lg:text-[30px]">
            Sessions list
          </h4>
          <p className="text-primaryTextColor md:text-[16px] lg:text-[18px] font-[500]">
            Overview of Active and Past Sessions
          </p>
        </div>
        <ActionModal classId={data.ID} />
      </div>
      <div className="mb-[10px] mt-4 flex gap-4">
        <Input
          placeholder="Search session by name"
          className="!w-[250px] !h-[48px]"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
          allowClear
          onClear={() => setSearchKeyword("")}
        />
        <Select
          placeholder="Select Status"
          className="!w-[180px] !h-[48px]"
          onChange={(value) => setStatusFilter(value)}
        >
          <Select.Option value={StatusEnum.ALL}>All</Select.Option>
          <Select.Option value={StatusEnum.COMPLETED}>Completed</Select.Option>
          <Select.Option value={StatusEnum.NOTSTARTED}>
            Not Started
          </Select.Option>
          <Select.Option value={StatusEnum.ONGOING}>Ongoing</Select.Option>
        </Select>
      </div>
      <div className="mt-8 h-[400px]">
        <SessionTable
          dataSource={data.Sessions}
          searchKeyword={searchKeyword}
          statusFilter={statusFilter}
        />
      </div>
    </>
  );
};

export default SessionManager;
