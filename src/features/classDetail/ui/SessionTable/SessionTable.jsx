import React from "react";
import { Table, Input, Select } from "antd";
import { formatDateTime } from "@shared/lib/utils/formatString";
import ActionModal from "../SessionModal/ActionModal/ActionModal";
import DeleteModal from "../SessionModal/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";

const SessionTable = ({ data }) => {
  // Define table columns
  const columns = [
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
      className: "!text-center",
      render: (text, record) => (
        <Link to={`/class/session/${record.ID}`} className="text-[#003087]">
          {text}
        </Link>
      ),
    },
    {
      title: "SESSION KEY",
      dataIndex: "sessionKey",
      key: "sessionKey",
      className: "!text-center",
    },
    {
      title: "START TIME",
      dataIndex: "startTime",
      key: "startTime",
      className: "!text-center",
      render: (text) => formatDateTime(text),
    },
    {
      title: "END TIME",
      dataIndex: "endTime",
      key: "endTime",
      className: "!text-center",
      render: (text) => formatDateTime(text),
    },
    {
      title: "NUMBER OF PARTICIPANTS",
      dataIndex: "numberOfParticipants",
      key: "numberOfParticipants",
      className: "!text-center",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      className: "!text-center",
      render: (text) => {
        const statusClass =
          text === "active" ? "text-green-500" : "text-red-500";
        return <span className={statusClass}>{text}</span>;
      },
    },
    {
      title: "ACTION",
      key: "action",
      className: "!text-center",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-4">
          <ActionModal isEdit={true} initialData={record} />
          <DeleteModal sessionID={record.ID} />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex w-full items-center justify-between mt-4">
        <div>
          <h4 className="font-[700] md:text-[28px] lg:text-[30px]">
            Sessions List
          </h4>
          <p className="text-[#637381] md:text-[16px] lg:text-[18px] font-[500]">
            Overview of Active and Past Sessions
          </p>
        </div>
        {/* Add Session Button */}
        <ActionModal isEdit={false} classId={data.ID} />
      </div>

      {/* Filters Section */}
      <div className="mb-[10px] mt-4 flex gap-4">
        <Input
          placeholder="Search session by name"
          className="!w-[250px] !h-[48px]"
        />
        <Select placeholder="Select Status" className="!w-[180px] !h-[48px]" />
      </div>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.ID}
        pagination={false}
        className="shadow-[0px_4px_4px_rgba(0,0,0,0.2)] border border-[#E0E0E0] rounded-lg mt-8"
      />
    </div>
  );
};

export default SessionTable;
