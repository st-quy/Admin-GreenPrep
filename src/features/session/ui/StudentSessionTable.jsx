import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Table, Select, Pagination, Spin } from "antd";
import { TableType, StatusType, LevelEnum } from "../constraint/TableEnum";
import {
  useSessionParticipants,
  useStudentParticipants,
} from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
function getSkillLevel(score, skill) {
  const thresholds = {
    Listening: [8, 16, 24, 34, 42],
    Reading: [8, 16, 26, 38, 46],
    Writing: [6, 18, 26, 40, 48],
    Speaking: [4, 16, 26, 41, 48],
  };

  if (!thresholds[skill]) {
    throw new Error("Invalid skill");
  }

  let levelIndex = thresholds[skill].findIndex(
    (threshold) => score < threshold
  );
  return levelIndex === -1 ? "C" : LevelEnum[levelIndex];
}
const StudentSessionTable = ({
  id,
  searchKeyword,
  type,
  status = "draft",
  onAllQuestionGraded = () => {},
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
    const keyword = searchKeyword?.toLowerCase().trim() || "";
    console.log(keyword);
    if (!keyword) return processedData;
    return processedData.filter((item) => {
      const fullName = String(item.User?.fullName || "").toLowerCase();
      const sessionName = String(item.Session?.sessionName || "").toLowerCase();
      const level = String(item.Level || "").toLowerCase();

      return (
        sessionName.includes(keyword) ||
        fullName.includes(keyword) ||
        level.includes(keyword)
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
      render: (text) => <div>{text || "No Data"}</div>,
      onHeaderCell: () => ({
        style: { paddingLeft: "0px", paddingRight: "0px" },
      }),
    },
    {
      title: "LISTENING",
      dataIndex: "Listening",
      key: "Listening",
      render: (text, record) => (
        <span className="font-[500] text-[14px]  text-[#637381]">
          {text ? text + " | " + getSkillLevel(text, "Listening") : "No Data"}
        </span>
      ),
    },
    {
      title: "READING",
      dataIndex: "Reading",
      key: "Reading",
      render: (text, record) => (
        <span className="font-[500] text-[14px]  text-[#637381]">
          {text ? text + " | " + getSkillLevel(text, "Reading") : "No Data"}
        </span>
      ),
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
            className="cursor-pointer underline underline-offset-4 font-[500] text-[14px] hover:opacity-80"
          >
            {text ? text + " | " + getSkillLevel(text, "Speaking") : "Ungraded"}
          </a>
        ) : (
          <span className="font-[500] text-[14px]  text-[#637381]">
            {text ? text + " | " + getSkillLevel(text, "Speaking") : "Ungraded"}
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
            className="cursor-pointer underline underline-offset-4  font-[500] text-[14px] hover:opacity-80"
          >
            {text ? text + " | " + getSkillLevel(text, "Writing") : "Ungraded"}
          </a>
        ) : (
          <span className="font-[500] text-[14px]  text-[#637381]">
            {text ? text + " | " + getSkillLevel(text, "Writing") : "Ungraded"}
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
            className="w-20"
          >
            {LevelEnum.map((lvl) => (
              <Select.Option key={lvl} value={lvl}>
                {lvl}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <span className="font-[500] text-[14px]  text-[#637381]">
            {level}
          </span>
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
              className="cursor-pointer underline underline-offset-4 font-[500] text-[14px] hover:opacity-80"
            >
              {text || "Unknown"}
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
          render: (text) => <span>{text || "Unknown"}</span>,
        },
        ...commonColumns,
      ];
    }
  }, [type, status, levels]);

  // if (isLoading) return <Spin />;
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
      scroll={{ x: 400 }}
      components={{
        header: {
          wrapper: (props) => (
            <thead
              {...props}
              className="bg-[#E6F0FA] text-[#637381] text-[16px]"
            />
          ),
          cell: (props) => (
            <th
              {...props}
              className="font-[550] tracking-wider text-center py-4 px-8"
            />
          ),
        },
      }}
    />
  );
};

export default StudentSessionTable;
