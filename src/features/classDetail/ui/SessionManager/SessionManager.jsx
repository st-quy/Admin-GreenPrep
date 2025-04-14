import React, { useState } from "react";
import ActionModal from "../SessionModal/ActionModal/ActionModal";
import TableSearch from "@shared/ui/TableSearch";
import { Link } from "react-router-dom";
import { formatDateTime } from "@shared/lib/utils/formatString";
import DeleteModal from "../SessionModal/DeleteModal/DeleteModal";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const SessionManager = ({ data, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true); // Mở modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  const sessionColumns = [
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
          <ActionModal initialData={record} />
          <span className="text-xl">
            <DeleteOutlined
              onClick={handleOpenModal}
              className="hover:opacity-50"
            />
          </span>
          <DeleteModal
            sessionID={record.ID}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between pt-8">
        <div>
          <h4 className="font-[700] md:text-[28px] lg:text-[30px]">
            Sessions list
          </h4>
          <p className="text-[#637381] md:text-[16px] lg:text-[18px] font-[500]">
            Overview of Active and Past Sessions
          </p>
        </div>
        <ActionModal classId={data.ID} />
      </div>
      <div className="mt-8">
        <TableSearch
          data={data.Sessions}
          columns={sessionColumns}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default SessionManager;
