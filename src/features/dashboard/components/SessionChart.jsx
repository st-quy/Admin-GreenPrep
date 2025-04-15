import React from "react";
import { Pie } from "@ant-design/plots";
import { Card, Typography } from "antd";
import PropTypes from "prop-types";

const { Title } = Typography;

export const SessionChart = ({ data }) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
      style: {
        fontSize: 14,
        fontWeight: 500,
      },
    },
    legend: {
      layout: "vertical",
      position: "right",
    },
    color: ["#1890ff", "#faad14", "#52c41a"],
    interactions: [{ type: "element-active" }],
  };

  return (
    <div className="p-4">
      <Title level={4} className="mb-6">
        Session Overview
      </Title>
      <div className="h-[400px]">
        <Pie {...config} />
      </div>
    </div>
  );
};

SessionChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
