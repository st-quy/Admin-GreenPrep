import React, { useMemo, useState } from "react";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@shared/lib/utils/formatString";
import ActionModal from "../../SessionModal/ActionModal/ActionModal";
import DeleteModal from "../../SessionModal/DeleteModal/DeleteModal";
import { DeleteOutlined } from "@ant-design/icons";

const SessionTable = ({ dataSource, searchKeyword, statusFilter }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionData, setSessionData] = useState(null);

  const handleNavigate = (id) => {
    navigate(`session/${id}`);
  };

  const statusTag = (status) => {
    const statusMap = {
      COMPLETED: { color: "green", text: "Completed" },
      ON_GOING: { color: "blue", text: "On Going" },
      NOT_STARTED: { color: "gray", text: "Not Started" },
    };
    return (
      <div className="w-full flex items-center justify-center">
        <Tag
          color={statusMap[status]?.color}
          className="rounded-2xl p-1 px-2  ml-3 text-center border-none"
        >
          {statusMap[status]?.text || "Unknown"}
        </Tag>
      </div>
    );
  };

  const sortedSessions = useMemo(() => {
    return dataSource.sort((a, b) => {
      return (
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime()
      );
    });
  }, [dataSource]);

  const filteredData = useMemo(() => {
    const keyword = searchKeyword?.toLowerCase().trim() || "";
    if (!keyword && !statusFilter) return dataSource;

    return sortedSessions.filter((item) => {
      const sessionName = String(item.sessionName || "").toLowerCase();

      // Kiểm tra cả keyword và statusFilter
      return (
        sessionName.includes(keyword) &&
        (item.status === statusFilter || !statusFilter)
      );
    });
  }, [dataSource, searchKeyword, statusFilter]);

  const handleDelete = (record) => {
    setSessionData(record);
    setIsOpen(true);
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
      dataIndex: ["SessionParticipants"],
      key: "SessionParticipants",
      render: (participants) => participants?.length || 0,
      ellipsis: true,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text) => statusTag(text),
      ellipsis: true,
    },
    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <div className="flex gap-4 w-full justify-center">
          <ActionModal initialData={record} />
          {record.SessionParticipants.length === 0 && (
            <DeleteOutlined
              className="hover:opacity-50 text-xl text-red-500 cursor-pointer"
              onClick={() => handleDelete(record)}
            />
          )}
        </div>
      ),
      onHeaderCell: () => {
        return {
          style: {
            textAlign: "center",
            backgroundColor: "#E6F0FA",
          },
        };
      },
      className: "shadow-[-4px_0px_0_rgba(0,0,0,0.1)] md:shadow-none",
    },
  ];
  const components = {
    header: {
      wrapper: (props) => (
        <thead {...props} className="bg-[#E6F0FA]  text-center" />
      ),
      cell: (props) => (
        <th
          {...props}
          className={`py-4 font-[500] whitespace-nowrap text-center text-[12px] md:text-[16px] ${props.className || ""}`}
        />
      ),
    },
    body: {
      cell: (props) => (
        <td
          {...props}
          className={`whitespace-nowrap font-[500]  text-[#637381] text-[10px] md:text-[14px]   ${props.className || ""} text-center items-center`}
        />
      ),
    },
  };

  return (
    <>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        rowKey={(record) => record.ID}
        components={components}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
      />
      <DeleteModal
        sessionID={sessionData?.ID}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default SessionTable;
