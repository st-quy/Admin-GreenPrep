import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Typography,
  Tabs,
  Select,
  Descriptions,
  Tag,
  Dropdown,
  Space,
  Button,
  Empty,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { fetchDashboardStats } from "../../features/dashboard/services/dashboardService";
import { StatCard } from "../../features/dashboard/components/StatCard";
import { RecentActivities } from "../../features/dashboard/components/RecentActivities";
import { PendingRequests } from "../../features/dashboard/components/PendingRequests";
import { SessionChart } from "../../features/dashboard/components/SessionChart";
import moment from "moment";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionStats, setSessionStats] = useState({
    totalStudents: 0,
    ongoingSessions: 0,
    upcomingSessions: 0,
    completedSessions: 0,
    totalSubmissions: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      calculateSessionStats();
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(
        "https://dev-api-greenprep.onrender.com/api/sessions/all"
      );
      const data = await response.json();
      if (data.status === 200) {
        setSessions(data.data);
        // Set first session as default
        if (data.data.length > 0) {
          setSelectedSession(data.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSessionStats = () => {
    // Count sessions by status
    const sessionsByStatus = sessions.reduce((acc, session) => {
      acc[session.status] = (acc[session.status] || 0) + 1;
      return acc;
    }, {});

    setSessionStats({
      totalStudents: selectedSession?.Classes?.className
        ? Math.floor(Math.random() * 30) + 20
        : 0,
      ongoingSessions: sessionsByStatus["ON_GOING"] || 0,
      upcomingSessions: sessionsByStatus["NOT_STARTED"] || 0,
      completedSessions: sessionsByStatus["COMPLETE"] || 0,
      totalSubmissions: Math.floor(Math.random() * 100) + 50,
      pendingRequests: Math.floor(Math.random() * 10) + 1,
    });
  };

  const handleSessionChange = (sessionId) => {
    const session = sessions.find((s) => s.ID === sessionId);
    setSelectedSession(session);
  };

  const dropdownItems = sessions.map((session) => ({
    key: session.ID,
    label: (
      <div className="py-2 px-4 hover:bg-gray-100">
        <div className="font-medium">{session.sessionName}</div>
        <div className="text-sm text-gray-500">{session.Classes.className}</div>
      </div>
    ),
    onClick: () => handleSessionChange(session.ID),
  }));

  const selectedSessionLabel = selectedSession ? (
    <Space>
      <div>
        <div className="font-medium">{selectedSession.sessionName}</div>
        <div className="text-sm text-gray-500">
          {selectedSession.Classes.className}
        </div>
      </div>
    </Space>
  ) : (
    "Select a session"
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "blue";
      case "ON_GOING":
        return "green";
      case "COMPLETE":
        return "purple";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const sessionChartData = [
    {
      type: "Ongoing",
      value: sessions.filter((session) => session.status === "ON_GOING").length,
      color: "#52c41a", // green
    },
    {
      type: "Not Started",
      value: sessions.filter((session) => session.status === "NOT_STARTED")
        .length,
      color: "#1890ff", // blue
    },
    {
      type: "Completed",
      value: sessions.filter((session) => session.status === "COMPLETE").length,
      color: "#722ed1", // purple
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Title level={2}>Dashboard</Title>
        <Dropdown
          menu={{ items: dropdownItems }}
          trigger={["click"]}
          overlayStyle={{
            minWidth: "300px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Button
            style={{
              width: "300px",
              height: "auto",
              padding: "8px 12px",
              textAlign: "left",
              whiteSpace: "normal",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedSessionLabel}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatCard
            icon={<TeamOutlined className="text-2xl text-white" />}
            title="Total Students"
            value={sessionStats.totalStudents}
            subtitle={`In ${selectedSession?.Classes?.className || "No Class"}`}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatCard
            icon={<BookOutlined className="text-2xl text-white" />}
            title="Session Status"
            value={selectedSession?.status || "N/A"}
            subtitle="Current Status"
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatCard
            icon={<ClockCircleOutlined className="text-2xl text-white" />}
            title="Total Sessions"
            value={sessions.length}
            subtitle={`${sessionChartData[0].value} Ongoing, ${sessionChartData[1].value} Not Started`}
            color="#faad14"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatCard
            icon={<FileTextOutlined className="text-2xl text-white" />}
            title="Completed Sessions"
            value={sessionChartData[2].value}
            subtitle={`${((sessionChartData[2].value / sessions.length) * 100).toFixed(1)}% Complete`}
            color="#722ed1"
          />
        </Col>
      </Row>

      {/* Charts and Activity Sections */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="h-full">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Session Overview" key="1">
                <SessionChart data={sessionChartData} />
              </TabPane>
              <TabPane tab="Recent Activities" key="2">
                <RecentActivities sessionId={selectedSession?.ID} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Session Details" className="h-full">
            {selectedSession ? (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Topic">
                  {selectedSession.Topic.Name}
                </Descriptions.Item>
                <Descriptions.Item label="Session Key">
                  {selectedSession.sessionKey}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={getStatusColor(selectedSession.status)}>
                    {selectedSession.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Start Time">
                  {new Date(selectedSession.startTime).toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="End Time">
                  {new Date(selectedSession.endTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty description="Select a session to view details" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
