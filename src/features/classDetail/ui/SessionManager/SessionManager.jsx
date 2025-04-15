import React, { useState } from "react";
import ActionModal from "../SessionModal/ActionModal/ActionModal";
import TableSearch from "@shared/ui/TableSearch";
import { Link } from "react-router-dom";
import { formatDateTime } from "@shared/lib/utils/formatString";
import DeleteModal from "../SessionModal/DeleteModal/DeleteModal";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { statusOptions } from "@features/classDetail/validate";

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
        <Link to={`session/${record.ID}`} className="text-[#003087]">
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
      dataIndex: "SessionParticipants",
      key: "SessionParticipants",
      className: "!text-center",
      render: (text) => {
        const numberOfParticipants = text.length;
        return <span>{numberOfParticipants}</span>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      className: "!text-center",
      render: (status) => {
        const info = statusOptions[status];
        return (
          <span
            className="px-3 py-1 rounded-full text-sm font-medium inline-block text-center"
            style={{ backgroundColor: info?.bg, color: info?.text }}
          >
            {info?.label || status}
          </span>
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      className: "!text-center",
      render: (_, record) => (
        <div className="flex justify-center items-center gap-4">
          <ActionModal initialData={record} />
          {record.SessionParticipants.length === 0 && (
            <>
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
            </>
          )}
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
          <p className="text-primaryTextColor md:text-[16px] lg:text-[18px] font-[500]">
            Overview of Active and Past Sessions
          </p>
        </div>
        <ActionModal classId={data?.ID} />
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
