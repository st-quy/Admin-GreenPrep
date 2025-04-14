import React, { useState, useEffect } from "react";
import { Table, Card, Button, Input, Row, Col, Spin, Typography } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { fetchTotalUsers } from "../../features/dashboard/services/userService";
import { exportToPDF } from "../../features/dashboard/services/pdfService";
import {
  fetchAllSessions,
  getSessionStatusStatistics,
} from "../../features/dashboard/services/sessionService";
import {
  ColumnChart,
  StatusChart,
} from "../../features/dashboard/components/ChartComponents";
import { StatCard } from "../../features/dashboard/components/StatCard";
import { TableHeaderCell } from "../../features/dashboard/components/TableHeaderCell";
import { StatusBadge } from "../../features/dashboard/components/StatusBadge";
import { ActionButton } from "../../features/dashboard/components/ActionButton";
import { getAllClasses } from "../../features/dashboard/services/classService";

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
      const usersCount = await fetchTotalUsers();
      setTotalUsers(usersCount);

      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter sessions based on search text
  const filteredSessions = sessions.filter((session) =>
    session.Classes.className.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    {
      title: <TableHeaderCell>Class Name</TableHeaderCell>,
      dataIndex: ["Classes", "className"],
      key: "className",
    },
    {
      title: <TableHeaderCell>Status</TableHeaderCell>,
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusBadge count={1} />,
    },
    {
      title: <TableHeaderCell>Actions</TableHeaderCell>,
      key: "actions",
      render: (_, record) => <ActionButton record={record} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Dashboard</Title>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={
              <DownloadOutlined
                style={{ fontSize: "24px", color: "#1890ff" }}
              />
            }
            title="Total Users"
            value={totalUsers}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={
              <DownloadOutlined
                style={{ fontSize: "24px", color: "#52c41a" }}
              />
            }
            title="Total Classes"
            value={classes.length}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={
              <DownloadOutlined
                style={{ fontSize: "24px", color: "#faad14" }}
              />
            }
            title="Total Sessions"
            value={sessions.length}
            color="#faad14"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            icon={
              <DownloadOutlined
                style={{ fontSize: "24px", color: "#f5222d" }}
              />
            }
            title="Active Sessions"
            value={sessions.filter((s) => s.status === "ON_GOING").length}
            color="#f5222d"
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <ColumnChart data={classSessionData} title="Sessions by Class" />
        </Col>
        <Col xs={24} md={12}>
          <StatusChart
            data={sessionStats}
            title="Session Status Distribution"
          />
        </Col>
      </Row>

      {/* Sessions Table */}
      <Card
        title="Sessions"
        extra={
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search by class name"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-64"
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => exportToPDF(filteredSessions)}
            >
              Export PDF
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredSessions}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
