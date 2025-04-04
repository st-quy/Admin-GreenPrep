import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Table, Select, Pagination, Spin } from "antd";
import { TableType, StatusType, LevelEnum } from "../constraint/TableEnum";
import {
  useSessionParticipants,
  useStudentParticipants,
} from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const StudentSessionTable = ({
  id,
  searchKeyword,
  type,
  status = "draft",
  onAllQuestionGraded = () => {},
  onNavigate = () => {},
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [levels, setLevels] = useState({});
  const { data, isLoading } =
    type == TableType.SESSION
      ? useSessionParticipants(id)
      : useStudentParticipants(id);

  const processedData = useMemo(() => {
    return (data?.data || []).map((record) => ({
      ...record,
      Total:
        (record.GrammarVocab || 0) +
        (record.Listening || 0) +
        (record.Reading || 0) +
        (record.Speaking || 0) +
        (record.Writing || 0),
    }));
  }, [data]);
  useEffect(() => {
    setLevels(
      processedData.reduce((acc, cur) => ({ ...acc, [cur.ID]: cur.Level }), {})
    );
  }, [processedData]);

  const filteredData = useMemo(() => {
    if (!searchKeyword) return processedData;
    return processedData.filter((item) => {
      const fullName = item.User?.fullName || "";
      const sessionName = item.Session?.sessionName || "";
      return (
        fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        sessionName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.Level?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.UserID?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
  }, [processedData, searchKeyword]);

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
      render: (text) => <div className="text-[10px] md:text-[16px]">{text || "No Data"}</div>,
    },
    {
      title: "LISTENING",
      dataIndex: "Listening",
      key: "Listening",
      render: (text) => <div className="text-[10px] md:text-[16px]">{text || "No Data"}</div>,
    },
    {
      title: "READING",
      dataIndex: "Reading",
      key: "Reading",
      render: (text) => <div className="text-[10px] md:text-[16px]">{text || "No Data"}</div>,
    },
    {
      title: "SPEAKING",
      dataIndex: "Speaking",
      key: "Speaking",
      render: (text, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <a
            onClick={() =>
              navigate(
                `/class/session/student/${record.User.ID}/grade?skill=speaking`
              )
            }
            className="cursor-pointer underline text-[10px] md:text-[16px] hover:opacity-80"
          >
            {text || "Ungraded"}
          </a>
        ) : (
          <span className="text-[10px] md:text-[16px] text-[#637381]">
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
            onClick={() =>
              navigate(
                `/class/session/student/${record.User.ID}/grade?skill=writing`
              )
            }
            className="cursor-pointer underline text-[10px] md:text-[16px] hover:opacity-80"
          >
            {text || "Ungraded"}
          </a>
        ) : (
          <span className="text-[10px] md:text-[16px] text-[#637381]">
            {text || "Ungraded"}
          </span>
        ),
    },
    { title: "TOTAL", dataIndex: "Total", key: "Total" },
    {
      title: "LEVEL",
      dataIndex: "Level",
      key: "Level",
      render: (level, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <Select
            value={levels[record.ID]}
            placeholder="Level"
            disabled={
              status === StatusType.PUBLISHED || type === TableType.STUDENT
            }
            onChange={(value) => onLevelChange(record.ID, value)}
            className="w-20 text-[10px] md:text-[16px]"
          >
            {LevelEnum.map((lvl) => (
              <Select.Option key={lvl} value={lvl}>
                {lvl}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <span className="text-[10px] md:text-[16px] text-[#637381]">{level}</span>
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
              onClick={() =>
                navigate(`/class/session/student/${record.User.ID}`)
              }
              className="cursor-pointer underline md:text-[16px] text-[10px] hover:opacity-80"
            >
              {text}
            </a>
          ),
        },
        ...commonColumns,
      ];
    } else {
      return [
        {
          title: "SESSION NAME",
          dataIndex: ["Session", "sessionName"],
          key: "SessionID",
        },
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

  // if (isLoading) return <Spin />;

  return (
    <Table
      columns={columns}
      dataSource={filteredData.map((item) => ({ ...item, key: item.ID }))}
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
      bordered
      className="border border-gray-200 pagination w-full p-0 m-0 overflow-x-auto bg-none"
      rowClassName="text-center"
      scroll={{ x: 768 }}
      components={{
        header: {
          wrapper: (props) => (
            <thead {...props} className="bg-[#E6F0FA] text-[#637381] md:text-[14px] text-[10px]" />
          ),
        },
      }}
    />
  );
};

export default StudentSessionTable;
