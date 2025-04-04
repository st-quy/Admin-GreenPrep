import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Tag, Typography, Descriptions, Divider } from "antd";
import { TableType } from "@features/session/constraint/TableEnum";

const { Title, Text } = Typography;
const statusTag = (status) => {
  const statusMap = {
    COMPLETED: { color: "green", text: "Completed" },
    ON_GOING: { color: "blue", text: "On Going" },
    NOT_STARTED: { color: "gray", text: "Not Started" },
  };
  return (
    <Tag color={statusMap[status]?.color} className="rounded-3xl">
      {statusMap[status]?.text || "Unknown"}
    </Tag>
  );
};
const Details = ({ type, id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (type === TableType.SESSION) {
          url = `https://dev-api-greenprep.onrender.com/api/sessions/${id}`;
        } else if (type === "student") {
          url = `https://dev-api-greenprep.onrender.com/api/users/${id}`;
        }

        const response = await axios.get(url);
        setData(response.data.data || response.data);
      } catch (error) {
        console.error("Error when getting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) {
    return <Spin className="flex justify-center mt-4" />;
  }

  if (!data) {
    return (
      <Text type="danger" className="text-center block">
        No data available.
      </Text>
    );
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const items =
    type === "session"
      ? [
          {
            key: "1",
            label: "Session Name",
            children: data.sessionName || "Not Available",
          },
          {
            key: "2",
            label: "Session Key",
            children: data.sessionKey || "Not Available",
          },
          {
            key: "3",
            label: "Participants",
            children: data.SessionParticipants?.length || "Not Available",
          },
          { key: "4", label: "Status", children: statusTag(data.status) },
          {
            key: "5",
            label: "Start Time",
            children: formatDateTime(data.startTime),
          },
          {
            key: "6",
            label: "End Time",
            children: formatDateTime(data.endTime),
          },
        ]
      : [
          {
            key: "1",
            label: "Student Name",
            children: `${data.firstName} ${data.lastName}` || "Not Available",
          },
          {
            key: "2",
            label: "Student ID",
            children: data.studentCode || "Not Available",
          },
          { key: "3", label: "Class", children: data.class || "Not Available" },
          { key: "4", label: "Email", children: data.email || "Not Available" },
          { key: "5", label: "Phone", children: data.phone || "Not Available" },
        ];

  return (
    <div>
      <p className="text-[30px] text-black font-bold">
        {type == TableType.SESSION
          ? "Session information"
          : "Student information"}
      </p>
      <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
        {type == TableType.SESSION
          ? "Track student request and participation."
          : "View student details."}
      </p>
      <div className="w-full">
        <Card className="w-full h-full px-4 py-0 md:px-14 md:py-6 shadow-md mt-8 flex justify-center">
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
            items={items}
            labelStyle={{
              width: "130px",
              fontWeight: "bold",
              padding: "5px",
            }}
            contentStyle={{
              width: "200px",
              fontWeight: "bold",
              padding: "5px",
            }}
            className="max-w-[400px] md:max-w-full flex justify-center"
          />
        </Card>
        <Divider className="mt-16" />
      </div>
    </div>
  );
};

export default Details;
