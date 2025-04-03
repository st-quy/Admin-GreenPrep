import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Tag, Typography, Divider } from "antd";
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
        setData(
          type === TableType.SESSION ? response.data.data : response.data
        );
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

  return (
    <>
      {data && (
        <div>
          <p className="text-[30px] text-black font-bold">
            {type === "session" ? "Session Information" : "Student Information"}
          </p>
          <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
            {type === "session"
              ? "View session details."
              : "View student details."}
          </p>
          <div className="mt-4">
            <div
              key={data.sessionKey}
              className="w-full flex justify-between columns-2 bg-white rounded-lg p-16 mt-[34px] shadow-md"
            >
              <div className="w-full flex columns-2 text-left text-base">
                <div className="w-1/4 flex flex-col">
                  {type === "session" ? (
                    <>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Session Name
                      </p>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Participants
                      </p>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Start time
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Student Name
                      </p>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Student ID
                      </p>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Class
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  {type === "session" ? (
                    <>
                      <p className="text-black font-semibold m-[15px]">
                        {data.sessionName || "Not Available"}
                      </p>
                      <p className="text-black font-semibold m-[15px]">
                        {data.SessionParticipants &&
                        Array.isArray(data.SessionParticipants)
                          ? data.SessionParticipants.length
                          : "Not Available"}
                      </p>
                      <p className="text-black font-semibold m-[15px]">
                        {formatDateTime(data.startTime) || "Not Available"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-black font-semibold m-[15px]">
                        {data.firstName + " " + data.lastName ||
                          "Not Available"}
                      </p>
                      <p className="text-black font-semibold m-[15px]">
                        {data.ID || "Not Available"}
                      </p>
                      <p className="text-black font-semibold m-[15px]">
                        {data.class || "Not Available"}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full flex columns-2 text-left text-base">
                <div className="w-1/4 flex flex-col">
                  {type === "session" ? (
                    <>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Session Key
                      </p>
                      {/* <p className="text-[#637381] font-medium m-[15px]">
                      Status
                    </p> */}
                      <p className="text-[#637381] font-medium m-[15px]">
                        End Time
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Email
                      </p>
                      <p className="text-[#637381] font-medium m-[15px]">
                        Phone
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  {type === "session" ? (
                    <>
                      <p className="text-black font-semibold m-[15px]">
                        {data.sessionKey || "Not Available"}
                      </p>
                      {/* <div className={getStatusStyle(data.status)}>
                      {formatStatus(data.status) || "Not Available"}
                    </div> */}
                      <p className="text-black font-semibold m-[15px]">
                        {formatDateTime(data.endTime) || "Not Available"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-black font-semibold m-[15px]">
                        {data.email || "Not Available"}
                      </p>
                      <p className="text-black font-semibold m-[15px]">
                        {data.phone || "Not Available"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full bg-black bg-opacity-50 my-[50px]" />
        </div>
      )}
    </>
  );
};

export default Details;
