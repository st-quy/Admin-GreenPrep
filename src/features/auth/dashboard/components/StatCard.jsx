import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const StatCard = ({
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
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: "100%",
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  </div>
);
