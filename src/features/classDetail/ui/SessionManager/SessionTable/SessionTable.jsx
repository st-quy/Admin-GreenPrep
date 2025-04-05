import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@shared/lib/utils/formatString";
import ActionModal from "../../SessionModal/ActionModal/ActionModal";
import DeleteModal from "../../SessionModal/DeleteModal/DeleteModal";

const SessionTable = ({ dataSource }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/class/session/${id}`);
  };

  const columns = [
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
      render: (text, record) => (
        <a
          onClick={() => handleNavigate(record.ID)}
          className="text-[#003087] hover:underline cursor-pointer"
        >
          {text}
        </a>
      ),
      ellipsis: true,
    },
    {
      title: "SESSION KEY",
      dataIndex: "sessionKey",
      key: "sessionKey",
      ellipsis: true,
    },
    {
      title: "START TIME",
      dataIndex: "startTime",
      key: "startTime",
      render: (time) => formatDateTime(time),
      ellipsis: true,
    },
    {
      title: "END TIME",
      dataIndex: "endTime",
      key: "endTime",
      render: (time) => formatDateTime(time),
      ellipsis: true,
    },
    {
      title: "NUMBER OF PARTICIPANTS",
      dataIndex: "numberOfParticipants",
      key: "numberOfParticipants",
      render: (participants) => participants?.length || 0,
      ellipsis: true,
    },
    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <div className="flex items-center gap-4 bg-white">
          <ActionModal isEdit={true} initialData={record} />
          <DeleteModal sessionID={record.ID} />
        </div>
      ),
      onHeaderCell: () => ({
        className: "bg-[#bae6fd] text-black", // màu header riêng cho cột này
      }),
      ellipsis: true,
      className: "custom-action-column",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-[#E6F0FA]">
      <Table
        columns={columns}
        dataSource={dataSource ? [...dataSource].reverse() : []}
        pagination={false}
        rowKey={(record) => record.ID}
        bordered
        scroll={{ x: "max-content" }}
        components={{
          header: {
            wrapper: (props) => (
              <thead
                {...props}
                className="bg-[#478edf] text-sm md:text-base lg:text-lg"
              />
            ),

            cell: (props) => (
              <th
                {...props}
                className="py-4 font-medium whitespace-nowrap text-center text-[12px] md:text-[16px]"
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                className="whitespace-nowrap text-center text-[#637381] text-[10px] md:text-[14px]"
              />
            ),
          },
        }}
        className="custom-table"
      />
    </div>
  );
};

export default SessionTable;
