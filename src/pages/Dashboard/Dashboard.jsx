import React, { useState, useEffect } from "react";
import { Table, Card, Button, Input, Row, Col, Spin, Typography } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { fetchTotalUsers } from "../../features/auth/dashboard/services/userService";
import { exportToPDF } from "../../features/auth/dashboard/services/pdfService";
import {
  fetchAllSessions,
  getSessionStatusStatistics,
} from "../../features/auth/dashboard/services/sessionService";
import {
  ColumnChart,
  StatusChart,
} from "../../features/auth/dashboard/components/ChartComponents";
import { StatCard } from "../../features/auth/dashboard/components/StatCard";
import { TableHeaderCell } from "../../features/auth/dashboard/components/TableHeaderCell";
import { StatusBadge } from "../../features/auth/dashboard/components/StatusBadge";
import { ActionButton } from "../../features/auth/dashboard/components/ActionButton";
import { getAllClasses } from "../../features/auth/dashboard/services/classService";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sessionStats, setSessionStats] = useState([]);
  const [classSessionData, setClassSessionData] = useState([]);

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
        // Fetch all sessions using sessionService
        const sessionsData = await fetchAllSessions();
        setSessions(sessionsData);

        // Get session statistics using sessionService
        const stats = await getSessionStatusStatistics();
        setSessionStats(stats);

        // Fetch all classes using classService
        const allClasses = await getAllClasses();
        setClasses(allClasses);

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
    <div className="p-3 md:p-6 bg-white min-h-screen">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center text-gray-500 mb-2">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Dashboard</span>
        </div>

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
