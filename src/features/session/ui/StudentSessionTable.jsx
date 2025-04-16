import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Table, Select, Pagination, Spin } from "antd";
import { TableType, StatusType, LevelEnum } from "../constant/TableEnum";
import {
  useSessionParticipants,
  useStudentParticipants,
} from "../hooks/useSession";
import "../css/index.scss";
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
  studentId,
  searchKeyword,
  type,
  status = "draft",
  onAllQuestionGraded = () => {},
  onDataReady,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [levels, setLevels] = useState({});

  const { data, isLoading } =
    type === TableType.SESSION
      ? useSessionParticipants(id, { page: currentPage, limit: pageSize })
      : useStudentParticipants(studentId, {
          page: currentPage,
          limit: pageSize,
        });

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
    if (onDataReady) {
      onDataReady(processedData);
    }
  }, [processedData]);

  useEffect(() => {
    setLevels(
      processedData.reduce((acc, cur) => ({ ...acc, [cur.ID]: cur.Level }), {})
    );
  }, [processedData]);

  const filteredData = useMemo(() => {
    const keyword = searchKeyword?.toLowerCase().trim() || "";
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
      width: "240px",
      render: (text) => <span>{text || "No Data"}</span>,
    },
    {
      title: "LISTENING",
      dataIndex: "Listening",
      key: "Listening",
      width: "120px",
      render: (text, record) => (
        <span>
          {text ? text + " | " + getSkillLevel(text, "Listening") : "No Data"}
        </span>
      ),
    },
    {
      title: "READING",
      dataIndex: "Reading",
      key: "Reading",
      width: "120px",
      render: (text, record) => (
        <span>
          {text ? text + " | " + getSkillLevel(text, "Reading") : "No Data"}
        </span>
      ),
    },
    {
      title: "SPEAKING",
      dataIndex: "Speaking",
      key: "Speaking",
      width: "120px",
      render: (text, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <a
            onClick={() => navigate(`participant/${record.ID}?skill=speaking`)}
            className="cursor-pointer underline underline-offset-4 hover:opacity-80"
          >
            {text ? text + " | " + getSkillLevel(text, "Speaking") : "Ungraded"}
          </a>
        ) : (
          <span>
            {text ? text + " | " + getSkillLevel(text, "Speaking") : "Ungraded"}
          </span>
        ),
    },
    {
      title: "WRITING",
      dataIndex: "Writing",
      key: "Writing",
      width: "120px",
      render: (text, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <a
            onClick={() => navigate(`participant/${record.ID}?skill=writing`)}
            className="cursor-pointer underline underline-offset-4 hover:opacity-80"
          >
            {text ? text + " | " + getSkillLevel(text, "Writing") : "Ungraded"}
          </a>
        ) : (
          <span>
            {text ? text + " | " + getSkillLevel(text, "Writing") : "Ungraded"}
          </span>
        ),
    },
    { title: "TOTAL", width: "90px", dataIndex: "Total", key: "Total" },
    {
      title: "LEVEL",
      dataIndex: "Level",
      key: "Level",
      fixed: "right",
      width: "90px",
      render: (level, record) =>
        type === TableType.SESSION && status !== StatusType.PUBLISHED ? (
          <Select
            value={levels[record.ID]}
            placeholder="Level"
            disabled={
              status === StatusType.PUBLISHED || type === TableType.STUDENT
            }
            onChange={(value) => onLevelChange(record.ID, value)}
            className="p-0"
          >
            {LevelEnum.map((lvl) => (
              <Select.Option key={lvl} value={lvl}>
                {lvl}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <span>{level || "No Data"}</span>
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

  const columns = useMemo(() => {
    if (type === TableType.SESSION) {
      return [
        {
          title: "STUDENT NAME",
          dataIndex: ["User", "fullName"],
          key: "fullName",
          width: "260px",
          render: (text, record) =>
            text ? (
              <a
                onClick={() => navigate(`student/${record.User.ID}`)}
                className="cursor-pointer underline underline-offset-4 hover:opacity-80"
              >
                {text}
              </a>
            ) : (
              "Unknown"
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
          render: (text) => (
            <span className="cursor-pointer hover:opacity-80">
              {text || "Unknown"}
            </span>
          ),
        },
        ...commonColumns,
      ];
    }
  }, [type, status, levels]);

  return (
    <div>
      {isLoading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={filteredData.map((item) => ({ ...item, key: item.ID }))}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.pagination?.totalItems || 0,
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
                <thead
                  {...props}
                  className="bg-tableHeadColor text-primaryTextColor"
                />
              ),
            },
          }}
        />
      )}
    </div>
  );
};

export default StudentSessionTable;
