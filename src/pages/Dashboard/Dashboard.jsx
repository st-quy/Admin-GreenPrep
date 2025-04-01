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
import {
  UserOutlined,
  BookOutlined,
  FileOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { fetchClassesWithSessionCount } from "../../features/auth/dashboard/services/classService";
import {
  fetchSessions,
  getSessionStatusStatistics,
} from "../../features/auth/dashboard/services/sessionService";
import { fetchTotalUsers } from "../../features/auth/dashboard/services/userService";
import { exportToPDF } from "../../features/auth/dashboard/services/pdfService";

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
  <div className="p-5 bg-white rounded-md shadow-sm h-full">
    <div className="flex items-center mb-3">
      {icon}
      <span className="ml-2 text-gray-500">{title}</span>
    </div>
    <div className="flex justify-between items-end mb-3">
      <div>
        <Title
          level={4}
          style={{ margin: 0, fontSize: "28px", fontWeight: "500" }}
        >
          {value}
        </Title>
      </div>
      {subText && <Text className="text-gray-400 text-xs">{subText}</Text>}
    </div>
    <div className="mt-3">
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

// Column Chart Component (Simplified version)
const ColumnChart = ({ data, title }) => {
  return (
    <Card title={title} className="shadow-sm" bordered={false}>
      <div className="p-4">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            <Text type="secondary">No session data available</Text>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {data.map((item, index) => (
              <div key={index} className="mb-4 w-1/2 px-2">
                <Text strong className="mb-1 block">
                  {item.type}
                </Text>
                <div className="flex items-center">
                  <div
                    className="mr-2 h-5 rounded-sm"
                    style={{
                      width: `${Math.min(item.value * 10, 80)}%`,
                      backgroundColor: "#6a5acd",
                    }}
                  ></div>
                  <Badge
                    count={item.value}
                    style={{ backgroundColor: "#6a5acd" }}
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

// Status Chart Component
const StatusChart = ({ data, title }) => {
  return (
    <Card title={title} className="shadow-sm" bordered={false}>
      <div className="p-4">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            <Text type="secondary">No status data available</Text>
          </div>
        ) : (
          <div>
            {data.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <Text>{item.type}</Text>
                  <Text>{item.value}</Text>
                </div>
                <Progress
                  percent={Math.min(item.value * 10, 100)}
                  showInfo={false}
                  strokeColor="#6a5acd"
                  trailColor="#f0f0f0"
                  strokeWidth={5}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sessionStats, setSessionStats] = useState([]);
  const [classSessionData, setClassSessionData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch classes with session count
        const classData = await fetchClassesWithSessionCount();
        setClasses(classData);

        // Prepare data for class session chart
        const chartData = classData.map((cls) => ({
          type: cls.className,
          value: cls.sessionCount || 0,
        }));
        setClassSessionData(chartData);

        // Fetch total users
        const users = await fetchTotalUsers();
        setTotalUsers(users);

        // Fetch session statistics
        const stats = await getSessionStatusStatistics();
        setSessionStats(stats);

        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate total sessions
  const totalSessions = classes.reduce((sum, cls) => {
    return sum + (cls.sessionCount || 0);
  }, 0);

  // Fetch session data for a specific class
  const loadSessions = async (classId) => {
    try {
      const data = await fetchSessions(classId);
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Columns for class table
  const classColumns = [
    {
      title: "Class Code",
      dataIndex: "className",
      key: "className",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <Text>{new Date(text).toLocaleDateString("en-US")}</Text>
      ),
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <Text>{new Date(text).toLocaleDateString("en-US")}</Text>
      ),
    },
    {
      title: "Total Sessions",
      dataIndex: "sessionCount",
      key: "sessionCount",
      render: (text) => (
        <Badge
          count={text || 0}
          showZero
          style={{ backgroundColor: text ? "#1890ff" : "#d9d9d9" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" ghost>
          Class Details
        </Button>
      ),
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
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <div className="flex items-center text-gray-500 mb-2">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Dashboard</span>
        </div>

        <Title level={3}>Dashboard</Title>
        <Text className="text-gray-600">
          Manage and organize both classes and individual sessions.
        </Text>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={8}>
          <StatCard
            icon={<span className="text-blue-600 text-xl">👤</span>}
            title="Total Student"
            value={totalUsers}
            increase="0.39%"
            subText="This week"
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard
            icon={<span className="text-purple-600 text-xl">📚</span>}
            title="Total Class"
            value={classes.length}
            subText="This week"
            increase="2.69%"
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard
            icon={<span className="text-green-500 text-xl">📝</span>}
            title="Total Sessions"
            value={totalSessions}
            subText="This week"
            increase="1.45%"
            color="#52c41a"
          />
        </Col>
      </Row>

      {/* Student Performance Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Class List
            </Title>
            <Text className="text-gray-500">
              View and manage all available classes.
            </Text>
          </div>
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => exportToPDF(classes)}
              icon={<DownloadOutlined />}
            >
              Export as PDF
            </Button>
            <Input
              placeholder="Search by class code"
              prefix={<SearchOutlined />}
              style={{ width: 220 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <Card className="shadow-sm" bordered={false}>
          <Table
            columns={classColumns}
            dataSource={filteredClasses}
            rowKey="ID"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) =>
                `Showing 1-${Math.min(total, 10)} of ${total}`,
            }}
            className="custom-table"
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
