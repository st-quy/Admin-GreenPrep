import React from "react";
import { Table, Input, Card, Progress } from "antd";
import {
  UserOutlined,
  BookOutlined,
  FileOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
// Import Chart.js trước khi import react-chartjs-2
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Radar, Line } from "react-chartjs-2";

// Đăng ký Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

// StatCard Component
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
      <div>
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // Mock data - sau này sẽ lấy từ API
  const statistics = {
    totalStudents: 105,
    totalClasses: 573,
    studentGrowth: "0.38%",
    classGrowth: "2.69%",
    totalTests: 1250,
    averageAccuracy: 75,
    totalSkills: 6,
  };

  const studentData = [
    {
      key: "1",
      studentName: "STUDENT A",
      sessionName: "FALL_P1_2024",
      grammar: { score: 42, grade: "C" },
      reading: { score: 42, grade: "C" },
      listening: { score: 42, grade: "C" },
      speaking: { score: 42, grade: "C" },
      writing: { score: 42, grade: "C" },
      total: 135,
      level: "C",
    },
  ];

  const recentActivities = [
    {
      key: "1",
      studentName: "STUDENT A",
      topicName: "Grammar",
      questionType: "Multiple Choice",
      accuracy: 85,
      date: "2024-04-15",
    },
  ];

  // Mock data cho biểu đồ
  const skillsData = {
    labels: [
      "Grammar",
      "Reading",
      "Listening",
      "Speaking",
      "Writing",
      "Vocabulary",
    ],
    datasets: [
      {
        label: "Student Performance",
        data: [65, 75, 70, 80, 60, 85],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const progressData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Progress Score",
        data: [65, 70, 75, 80, 85, 90],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const columns = [
    {
      title: "STUDENT NAME",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "SESSION NAME",
      dataIndex: "sessionName",
      key: "sessionName",
    },
    {
      title: "GRAMMAR & VOCABS",
      dataIndex: "grammar",
      key: "grammar",
      render: (text) => `${text.score} | ${text.grade}`,
    },
    {
      title: "READING",
      dataIndex: "reading",
      key: "reading",
      render: (text) => `${text.score} | ${text.grade}`,
    },
    {
      title: "LISTENING",
      dataIndex: "listening",
      key: "listening",
      render: (text) => `${text.score} | ${text.grade}`,
    },
    {
      title: "SPEAKING",
      dataIndex: "speaking",
      key: "speaking",
      render: (text) => `${text.score} | ${text.grade}`,
    },
    {
      title: "WRITING",
      dataIndex: "writing",
      key: "writing",
      render: (text) => `${text.score} | ${text.grade}`,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage and organize both classes and individual sessions.
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<UserOutlined />}
          title="Total Students"
          value={statistics.totalStudents}
        />
        <StatCard
          icon={<FileOutlined />}
          title="Total Tests Taken"
          value={statistics.totalTests}
        />
        <StatCard
          icon={<CheckCircleOutlined />}
          title="Average Accuracy"
          value={`${statistics.averageAccuracy}%`}
        />
        <StatCard
          icon={<TrophyOutlined />}
          title="Skills Covered"
          value={statistics.totalSkills}
        />
      </div>

      {/* Student Performance Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Student Performance</h2>
            <p className="text-gray-600">
              Monitor academic progress and achievements.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Export as PDF
            </button>
            <Input.Search
              placeholder="Search by student name"
              className="w-full md:w-[300px]"
            />
          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={studentData}
            pagination={{
              total: 50,
              pageSize: 10,
              showSizeChanger: false,
            }}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6">
        {/* Recent Student Activities */}
        <Card title="Recent Activities">
          <Table
            columns={[
              {
                title: "Student",
                dataIndex: "studentName",
                key: "studentName",
              },
              {
                title: "Topic",
                dataIndex: "topicName",
                key: "topicName",
              },
              {
                title: "Question Type",
                dataIndex: "questionType",
                key: "questionType",
              },
              {
                title: "Accuracy",
                dataIndex: "accuracy",
                key: "accuracy",
                render: (accuracy) => (
                  <Progress percent={accuracy} size="small" />
                ),
              },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
              },
            ]}
            dataSource={recentActivities}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Biểu đồ kỹ năng */}
        <Card title="Skills Performance">
          <Radar data={skillsData} />
        </Card>

        {/* Biểu đồ tiến độ theo thời gian */}
        <Card title="Progress Over Time">
          <Line data={progressData} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
