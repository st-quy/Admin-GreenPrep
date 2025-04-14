import React from "react";
import { Card, Typography, Progress } from "antd";

const { Text } = Typography;

// Modern Column Chart Component
export const ColumnChart = ({ data, title }) => {
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
      <div className="space-y-4">
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
export const StatusChart = ({ data, title }) => {
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
        <div className="text-center py-8">
          <Text type="secondary">No status data available</Text>
        </div>
      ) : (
        <div className="space-y-6">
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
