import React, { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ type, id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (type === "session") {
          url = `https://dev-api-greenprep.onrender.com/api/sessions/${id}`;
        } else if (type === "student") {
          url = `https://dev-api-greenprep.onrender.com/api/users/${id}`;
        }
  
        const response = await axios.get(url);
        setData([response.data.data]);
      } catch (error) {
        console.error("Error when getting data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [type, id]);

  if (loading) {
    return <p className="text-center text-red-500 font-bold">Loading...</p>;
  }

  if (data.length === 0) {
    return <p className="text-center text-red-500 font-bold">No data available.</p>;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "w-[106px] px-[10px] py-[3px] bg-greenLight6 flex items-center justify-center rounded-full text-greenDark font-medium m-[12px]";
      case "ON_GOING":
        return "w-[96px] px-[10px] py-[3px] bg-blueLight5 flex items-center justify-center rounded-full text-blueDark font-medium m-[12px]";
      case "NOT_STARTED":
        return "w-[114px] px-[10px] py-[3px] bg-dark8 flex items-center justify-center rounded-full text-dark3 font-medium m-[12px]";
      default:
        return "";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Completed";
      case "ON_GOING":
        return "On going";
      case "NOT_STARTED":
        return "Not started";
      default:
        return "Unknown";
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <p className="text-[30px] text-black font-bold">
        {type === "session" ? "Session Information" : "Student Information"}
      </p>
      <p className="text-[18px] text-[#637381] font-medium mt-[10px]">
        {type === "session" ? "View session details." : "View student details."}
      </p>
      <div className="mt-4">
        {data.map((item, index) => (
          <div
            key={index}
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
                      Number of participants
                    </p>
                    <p className="text-[#637381] font-medium m-[15px]">
                      Session Date
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
                    <p className="text-[#637381] font-medium m-[15px]">Class</p>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                {type === "session" ? (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.sessionName || "Not Available"}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                    {item.SessionParticipants && Array.isArray(item.SessionParticipants)
                      ? item.SessionParticipants.length
                      : "Not Available"}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {formatDateTime(item.startTime) || "Not Available"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.studentName || "Not Available"}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.studentID || "Not Available"}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.className || "Not Available"}
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
                    <p className="text-[#637381] font-medium m-[15px]">
                      Status
                    </p>
                    <p className="text-[#637381] font-medium m-[15px]">
                      End Time
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#637381] font-medium m-[15px]">Email</p>
                    <p className="text-[#637381] font-medium m-[15px]">Phone</p>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                {type === "session" ? (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.sessionKey || "Not Available"}
                    </p>
                    <div className={getStatusStyle(item.status)}>
                      {formatStatus(item.status) || "Not Available"}
                    </div>
                    <p className="text-black font-semibold m-[15px]">
                      {formatDateTime(item.endTime) || "Not Available"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.email || "Not Available"}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.phone || "Not Available"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="w-full bg-black bg-opacity-50 my-[50px]" />
    </div>
  );
};

export default Details;
