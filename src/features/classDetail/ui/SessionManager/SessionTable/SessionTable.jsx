import React from "react";
import { Table, Button, Pagination } from "antd";
import { formatDateTime } from "@shared/lib/utils/formatString";
import ActionModal from "../../SessionModal/ActionModal/ActionModal";
import DeleteModal from "../../SessionModal/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";

const SessionTable = ({ dataSource }) => {
  const navigate = useNavigate();

  // Navigate to session details
  const handleNavigate = (id) => {
    navigate(`/class/session/${id}`);
  };

  // Define table columns
  const columns = [
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
      className: "!text-center",
      render: (text, record) => (
        <a onClick={() => handleNavigate(record.ID)} className="text-[#003087]">
          {text}
        </a>
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
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.ID}
        pagination={false}
        className="shadow-[0px_4px_4px_rgba(0,0,0,0.2)] border border-[#E0E0E0] rounded-lg"
      />
    </>
  );
};

export default SessionTable;
