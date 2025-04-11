import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Row,
  Col,
  Spin,
  Badge,
  Typography,
  Progress,
} from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { fetchClassesWithSessionCount } from "../../features/auth/dashboard/services/classService";
import { fetchTotalUsers } from "../../features/auth/dashboard/services/userService";
import { exportToPDF } from "../../features/auth/dashboard/services/pdfService";
import axios from "axios";

const { Title, Text } = Typography;

// Modern Statistic Card Component
const StatCard = ({
  icon,
  title,
  value,
  subText = null,
  color = "#1890ff",
  increase = null,
}) => (
  <div className="p-4 md:p-5 bg-white rounded-md shadow-sm h-full">
    <div className="flex items-center mb-2 md:mb-3">
      {icon}
      <span className="ml-2 text-gray-500 text-sm md:text-base">{title}</span>
    </div>
    <div className="flex justify-between items-end mb-2 md:mb-3">
      <div>
        <Title
          level={4}
          style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}
          className="md:text-[28px]"
        >
          {value}
        </Title>
      </div>
      {subText && <Text className="text-gray-400 text-xs">{subText}</Text>}
    </div>
    <div className="mt-2 md:mt-3">
      {increase && (
        <Text className="text-xs text-green-600 mb-1 block">
          {increase} <span className="ml-1">↑</span>
        </Text>
      )}
      <Progress
        percent={100}
        showInfo={false}
        strokeColor={color}
        trailColor="#f0f0f0"
        strokeWidth={3}
      />
    </div>
  </div>
);

// Modern Column Chart Component
const ColumnChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const colors = {
    bar: "#6366F1",
    text: "#4B5563",
    title: "#111827",
    background: "#F9FAFB",
    border: "#E5E7EB",
  };

  return (
    <Card
      title={
        <Text strong className="text-lg" style={{ color: colors.title }}>
          {title}
        </Text>
      }
      className="shadow-sm hover:shadow-md transition-shadow duration-300"
      bodyStyle={{ padding: "1.5rem" }}
      bordered={false}
    >
      <div className="space-y-4  overflow-auto h-[200px]">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <Text type="secondary">No session data available</Text>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <Text
                    strong
                    className="text-sm"
                    style={{ color: colors.text }}
                  >
                    {item.type}
                  </Text>
                  <Text className="text-sm" style={{ color: colors.text }}>
                    {item.value}
                  </Text>
                </div>
                <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: colors.bar,
                      opacity: 0.9 - index * 0.1,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

// Modern Status Chart Component
const StatusChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = {
    NOT_STARTED: "#6366F1",
    ON_GOING: "#10B981",
    COMPLETED: "#F59E0B",
    CANCELLED: "#EF4444",
  };

  return (
    <Card
      title={
        <Text strong className="text-lg">
          {title}
        </Text>
      }
      className="shadow-sm hover:shadow-md transition-shadow duration-300"
      bodyStyle={{ padding: "1.5rem" }}
      bordered={false}
    >
      {data.length === 0 ? (
        <div className="text-center py-8 h-[200px]">
          <Text type="secondary">No status data available</Text>
        </div>
      ) : (
        <div className="space-y-6 h-[200px]">
          <div className="grid grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-sm transition-shadow duration-300"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[item.type] || "#6366F1" }}
                  />
                  <Text strong className="text-sm">
                    {item.type}
                  </Text>
                </div>
                <div className="space-y-1">
                  <Text className="text-2xl font-semibold">{item.value}</Text>
                  <Text className="text-xs text-gray-500">
                    {Math.round((item.value / total) * 100)}% of total
                  </Text>
                </div>
                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(item.value / total) * 100}%`,
                      backgroundColor: colors[item.type] || "#6366F1",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <Text className="text-sm text-gray-500">
              Total Sessions: {total}
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
};

// Custom Table Header Cell Component
const TableHeaderCell = ({ children, ...props }) => (
  <th
    {...props}
    className="bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sessionStats, setSessionStats] = useState([]);
  const [classSessionData, setClassSessionData] = useState([]);

  // Fetch all sessions
  const fetchAllSessions = async () => {
    try {
      const response = await axios.get(
        "https://dev-api-greenprep.onrender.com/api/sessions/all"
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
  };

  // Process sessions to get statistics
  const processSessionStats = (sessions) => {
    const statusCounts = sessions.reduce((acc, session) => {
      acc[session.status] = (acc[session.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([type, value]) => ({
      type,
      value,
    }));
  };

  // Process class session data
  const processClassSessionData = (sessions) => {
    const classSessionCounts = sessions.reduce((acc, session) => {
      const className = session.Classes.className;
      acc[className] = (acc[className] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(classSessionCounts).map(([type, value]) => ({
      type,
      value,
    }));
  };

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all sessions
        const sessionsData = await fetchAllSessions();
        setSessions(sessionsData);

        // Process sessions to get unique classes
        const uniqueClasses = Array.from(
          new Set(sessionsData.map((session) => session.Classes))
        ).map((classInfo) => ({
          ...classInfo,
          sessionCount: sessionsData.filter(
            (s) => s.Classes.ID === classInfo.ID
          ).length,
        }));
        setClasses(uniqueClasses);

        // Process session statistics
        const stats = processSessionStats(sessionsData);
        setSessionStats(stats);

        // Process class session data
        const chartData = processClassSessionData(sessionsData);
        setClassSessionData(chartData);

        // Fetch total users
        const users = await fetchTotalUsers();
        setTotalUsers(users);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate total sessions
  const totalSessions = sessions.length;

  // Status Badge Component
  const StatusBadge = ({ count }) => {
    let color = count > 5 ? "#10B981" : count > 0 ? "#6366F1" : "#9CA3AF";
    return (
      <div className="inline-flex items-center">
        <span
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: color }}
        />
        <span
          className="px-2.5 py-0.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {count || 0}
        </span>
      </div>
    );
  };

  // Action Button Component
  const ActionButton = ({ record }) => (
    <div className="flex items-center gap-2">
      <Button
        type="primary"
        ghost
        size="small"
        className="flex items-center gap-1 hover:scale-105 transition-transform"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Class Details
      </Button>
    </div>
  );

  // Columns for class table
  const classColumns = [
    {
      title: "Class Code",
      dataIndex: "className",
      key: "className",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              {text.slice(0, 2)}
            </span>
          </div>
          <div>
            <Text strong className="text-gray-900">
              {text}
            </Text>
            <Text className="text-gray-500 text-sm block">
              ID: {record.ID.slice(0, 8)}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div className="flex flex-col">
          <Text strong className="text-gray-900">
            {new Date(text).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
          <Text className="text-gray-500 text-sm">
            {new Date(text).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <div className="flex flex-col">
          <Text strong className="text-gray-900">
            {new Date(text).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
          <Text className="text-gray-500 text-sm">
            {new Date(text).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </div>
      ),
    },
    {
      title: "Total Sessions",
      dataIndex: "sessionCount",
      key: "sessionCount",
      render: (text) => <StatusBadge count={text} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <ActionButton record={record} />,
    },
  ];

  // Filter classes by search text
  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen">
      <div className="mb-4 md:mb-6">
        <Title level={3} className="text-xl md:text-2xl lg:text-3xl">
          Dashboard
        </Title>
        <Text className="text-gray-600 text-sm md:text-base">
          Manage and organize both classes and individual sessions.
        </Text>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[12, 12]} className="mb-6 md:mb-8">
        <Col xs={24} sm={24} md={8}>
          <StatCard
            icon={<span className="text-blue-600 text-lg md:text-xl">👤</span>}
            title="Total Student"
            value={totalUsers}
            increase="0.39%"
            subText="This week"
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatCard
            icon={
              <span className="text-purple-600 text-lg md:text-xl">📚</span>
            }
            title="Total Class"
            value={classes.length}
            subText="This week"
            increase="2.69%"
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatCard
            icon={<span className="text-green-500 text-lg md:text-xl">📝</span>}
            title="Total Sessions"
            value={totalSessions}
            subText="This week"
            increase="1.45%"
            color="#52c41a"
          />
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <StatusChart data={sessionStats} title="Session Status Overview" />
        </Col>
        <Col xs={24} lg={12}>
          <ColumnChart
            data={classSessionData}
            title="Sessions Distribution by Class"
          />
        </Col>
      </Row>

      {/* Class List Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <Title
              level={4}
              className="text-xl font-semibold m-0 text-gray-900"
            >
              Class List
            </Title>
            <Text className="text-gray-500 mt-1">
              View and manage all available classes
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              type="primary"
              onClick={() => exportToPDF(classes)}
              icon={<DownloadOutlined />}
              className="flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              Export as PDF
            </Button>
            <Input
              placeholder="Search by class code"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full sm:w-64 hover:border-indigo-400 focus:border-indigo-400 transition-colors"
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </div>
        </div>

        <Card
          className="shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          bordered={false}
        >
          <Table
            columns={classColumns}
            dataSource={filteredClasses}
            rowKey="ID"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => (
                <Text className="text-gray-500">
                  Showing{" "}
                  <span className="font-medium text-gray-900">
                    {Math.min(total, 10)}
                  </span>{" "}
                  of <span className="font-medium text-gray-900">{total}</span>{" "}
                  classes
                </Text>
              ),
            }}
            className="custom-table"
            scroll={{ x: "max-content" }}
            onRow={(record) => ({
              className: "hover:bg-gray-50 transition-colors cursor-pointer",
            })}
            components={{
              header: {
                cell: TableHeaderCell,
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
