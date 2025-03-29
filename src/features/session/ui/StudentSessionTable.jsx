import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Table, Select, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { TableType, StatusType, LevelEnum } from "../constraint/TableEnum";

const StudentSessionTable = ({
  data,
  type,
  status,
  onAllQuestionGraded = () => {},
}) => {
  const navigate = useNavigate();
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

  const checkIsAllQuestionGraded = useCallback(() => {
    const allGraded = data.every(
      (record) =>
        record.speaking !== null &&
        record.speaking !== "" &&
        record.writing !== null &&
        record.writing !== ""
    );

    const allLevelsSelected = Object.values(levels).every(
      (level) => level !== undefined && level !== null && level !== ""
    );

    if (allGraded && allLevelsSelected) {
      onAllQuestionGraded();
    }
  }, [data, levels, onAllQuestionGraded]);

  useEffect(() => {
    if (type === TableType.SESSION && status !== StatusType.PUBLISHED) {
      checkIsAllQuestionGraded();
    }
  }, [levels, data, checkIsAllQuestionGraded]);

  const handleNavigate = useCallback(
    (studentId, partNo) => {
      navigate(`/edit-score/${studentId}/${partNo}`);
    },
    [navigate]
  );

  const onLevelChange = (key, value) => {
    setLevels((prev) => ({ ...prev, [key]: value }));
  };

  const columns = useMemo(() => {
    const commonColumns = [
      { title: "GRAMMAR & VOCABULARY", dataIndex: "grammar", key: "grammar" },
      { title: "LISTENING", dataIndex: "listening", key: "listening" },
      { title: "READING", dataIndex: "reading", key: "reading" },
      {
        title: "SPEAKING",
        dataIndex: "speaking",
        key: "speaking",
        render: (text, record) =>
          type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
            <a
              className="cursor-pointer underline text-[14px] hover:opacity-80"
              onClick={() => handleNavigate(record.studentId, "speaking")}
            >
              {text && text !== "" ? text : "Ungraded"}
            </a>
          ) : (
            <span className="text-[12px] text-[#637381]">
              {text && text !== "" ? text : "Ungraded"}
            </span>
          ),
      },
      {
        title: "WRITING",
        dataIndex: "writing",
        key: "writing",
        render: (text, record) =>
          type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
            <a
              className="cursor-pointer underline text-[14px] hover:opacity-80"
              onClick={() => handleNavigate(record.studentId, "writing")}
            >
              {text && text !== "" ? text : "Ungraded"}
            </a>
          ) : (
            <span className="text-[12px] text-[#637381]">
              {text && text !== "" ? text : "Ungraded"}
            </span>
          ),
      },
      { title: "TOTAL", dataIndex: "total", key: "total" },
      {
        title: "LEVEL",
        dataIndex: "level",
        key: "level",
        render: (level, record) => (
          <Select
            value={levels[record.studentId] || undefined}
            placeholder="Level"
            disabled={
              status === StatusType.PUBLISHED || type === TableType.STUDENT
            }
            onChange={(value) => onLevelChange(record.studentId, value)}
            className="w-20"
          >
            {LevelEnum.map((lvl) => (
              <Select.Option key={`${record.studentId}-${lvl}`} value={lvl}>
                {lvl}
              </Select.Option>
            ))}
          </Select>
        ),
      },
    ];

    if (type === TableType.SESSION) {
      return [
        { title: "STUDENT NAME", dataIndex: "name", key: "name" },
        ...commonColumns,
      ];
    } else if (type === TableType.STUDENT) {
      return [
        { title: "SESSION NAME", dataIndex: "name", key: "name" },
        ...commonColumns,
      ];
    }
    return [];
  }, [type, status, handleNavigate, onLevelChange, levels]);

  const processedData = useMemo(
    () =>
      data.map((record) => ({
        ...record,
        total:
          (record.grammar || 0) +
          (record.listening || 0) +
          (record.reading || 0) +
          (record.speaking || 0) +
          (record.writing || 0),
      })),
    [data]
  );
  const paginatedData = useMemo(
    () =>
      processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [data, currentPage, pageSize]
  );

  return (
    <Table
      columns={columns}
      dataSource={paginatedData.map((item, index) => ({
        ...item,
        key: `${type}-${item.studentId}-${index}`,
      }))}
      pagination={{
        style: { marginRight: "32px" },
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
      className="border border-gray-200 pagination w-full p-0 m-0 overflow-x-auto bg-none"
      rowClassName="text-center"
      bordered
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
