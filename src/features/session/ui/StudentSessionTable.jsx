import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Table, Select, Pagination, Spin } from "antd";
import { TableType, StatusType, LevelEnum } from "../constraint/TableEnum";
import {
  useSessionParticipants,
  useStudentParticipants,
} from "../hooks/useSession";

const StudentSessionTable = ({
  id,
  data,
  searchKeyword,
  type,
  status = "draft",
  onAllQuestionGraded = () => {},
  onNavigate,
  onStudentClick = (data) => {},
  isLoading = false, // Add isLoading as a prop with a default value
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const initialLevels = useMemo(
    () =>
      data.reduce((acc, cur) => {
        acc[cur.studentId] = cur.level;
        return acc;
      }, {}),
    [data]
  );

  const [levels, setLevels] = useState(initialLevels);

  const processedData = useMemo(() => {
    // Process the data as needed, for example:
    return data.map((item) => ({
      ...item,
      Total: item.GrammarVocab + item.Listening + item.Reading,
    }));
  }, [data]);

  const checkIsAllQuestionGraded = useCallback(() => {
    if (!processedData.length) return;

    const allGraded = processedData.every(
      (record) => record.Speaking && record.Writing
    );
    const allLevelsSelected = Object.values(levels).every((level) => level);

    if (allGraded && allLevelsSelected) {
      onAllQuestionGraded?.();
    }
  }, [processedData, levels]);

  useEffect(() => {
    if (type === TableType.SESSION && status !== StatusType.PUBLISHED) {
      checkIsAllQuestionGraded();
    }
  }, [checkIsAllQuestionGraded]);

  const onLevelChange = (key, value) => {
    setLevels((prev) => ({ ...prev, [key]: value }));
  };

  const commonColumns = [
    {
      title: "GRAMMAR & VOCABULARY",
      dataIndex: "GrammarVocab",
      key: "GrammarVocab",
    },
    { title: "LISTENING", dataIndex: "Listening", key: "Listening" },
    { title: "READING", dataIndex: "Reading", key: "Reading" },
    {
      title: "SPEAKING",
      dataIndex: "Speaking",
      key: "Speaking",
      render: (text, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <a
            onClick={() => onNavigate(record.ID, "speaking")}
            className="cursor-pointer underline text-[14px] hover:opacity-80"
          >
            {text || "Ungraded"}
          </a>
        ) : (
          <span className="text-[14px] text-[#637381]">
            {text || "Ungraded"}
          </span>
        ),
    },
    {
      title: "WRITING",
      dataIndex: "Writing",
      key: "Writing",
      render: (text, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <a
            onClick={() => onNavigate(record.ID, "writing")}
            className="cursor-pointer underline text-[14px] hover:opacity-80"
          >
            {text || "Ungraded"}
          </a>
        ) : (
          <span className="text-[14px] text-[#637381]">
            {text || "Ungraded"}
          </span>
        ),
    },
    { title: "TOTAL", dataIndex: "Total", key: "Total" },
    {
      title: "LEVEL",
      dataIndex: "Level",
      key: "Level",
      render: (level, record) => (
        <Select
          value={levels[record.ID]}
          placeholder="Level"
          disabled={
            status === StatusType.PUBLISHED || type === TableType.STUDENT
          }
          onChange={(value) => onLevelChange(record.ID, value)}
          className="w-20"
        >
          {LevelEnum.map((lvl) => (
            <Select.Option key={lvl} value={lvl}>
              {lvl}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const columns = useMemo(() => {
    if (type === TableType.SESSION) {
      return [
        {
          title: "STUDENT NAME",
          dataIndex: ["User", "fullName"],
          key: "fullName",
          render: (text, record) => (
            <a
              onClick={() => onStudentClick(record.ID)}
              className="cursor-pointer underline text-[14px] hover:opacity-80"
            >
              {text}
            </a>
          ),
        },
        ...commonColumns,
      ];
    } else {
      return [
        { title: "SESSION NAME", dataIndex: ["Session","sessionName"], key: "SessionID" },
        ...commonColumns,
      ];
    }
  }, [type, status, levels]);

  const paginatedData = useMemo(() => {
    return processedData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [processedData, currentPage, pageSize]);

  if (isLoading) return <Spin />;

  return (
    <Table
      columns={columns}
      dataSource={paginatedData.map((item) => ({ ...item, key: item.ID }))}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total}`,
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        },
      }}
      bordered
      className="border border-gray-200 pagination w-full p-0 m-0 overflow-x-auto bg-none"
      rowClassName="text-center"
      scroll={{ x: 768 }}
      components={{
        header: {
          wrapper: (props) => (
            <thead {...props} className="bg-[#E6F0FA] text-[#637381]" />
          ),
        },
      }}
    />
  );
};

export default StudentSessionTable;
