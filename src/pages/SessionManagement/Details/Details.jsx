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
          url = `https://dev-api-greenprep.onrender.com/api/session-participants/user/${id}`;
        }

        const response = await axios.get(url);

        if (type === "student") {
          const userData = response.data.data[0]?.User || {};

          if (!userData.fullName) { 
            userData.fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
          }

          setData([userData]);
        } else {
          setData([response.data.data]);
        }
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
    return (
      <p className="text-center text-red-500 font-bold">No data available.</p>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "w-[106px] px-[10px] py-[3px] bg-greenLight6 flex items-center justify-center rounded-full text-greenDark font-medium my-[12px]";
      case "ON_GOING":
        return "w-[96px] px-[10px] py-[3px] bg-blueLight5 flex items-center justify-center rounded-full text-blueDark font-medium my-[12px]";
      case "NOT_STARTED":
        return "w-[114px] px-[10px] py-[3px] bg-dark8 flex items-center justify-center rounded-full text-dark3 font-medium my-[12px]";
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
    <>
      {data && (
        <div>
          <p className="md:text-[30px] text-[20px] text-black font-bold">
            {type === "session" 
              ? "Session Information" 
              : "Student Information"}
          </p>
          <p className="md:text-[18px] text-[12px] text-[#637381] font-medium mt-[10px]">
            {type === "session"
              ? "View session details."
              : "View student details."}
          </p>
          <div className="md:mt-4 mt-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full flex justify-between columns-2 bg-white rounded-lg lg:p-16 md:p-12 p-8 mt-[34px] shadow-md"
              >
                <div className="w-full flex columns-2 text-left md:text-base text-xs">
                  <div className="lg:w-1/4 md:w-2/5 w-2/5 flex flex-col">
                    {type === "session" ? (
                      <div>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Session Name
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Participants
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Start time
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Student Name
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Student ID
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Class
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {type === "session" ? (
                      <div>
                        <p className="text-black font-semibold my-[15px]">
                          {item.sessionName || "Not Available"}
                        </p>
                        <p className="text-black font-semibold my-[15px]">
                          {item.SessionParticipants &&
                          Array.isArray(item.SessionParticipants)
                            ? item.SessionParticipants.length
                            : "Not Available"}
                        </p>
                        <p className="text-black font-semibold my-[15px]">
                          {formatDateTime(item.startTime) || "Not Available"}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-black font-semibold my-[15px]">
                          {item.fullName || "Not Available"}
                        </p>
                        <p className="text-black font-semibold my-[15px]">
                          {item.studentCode || "Not Available"}
                        </p>
                        <p className="text-black font-semibold my-[15px]">
                          {item.class || "Not Available"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full flex columns-2 text-left md:text-base text-xs">
                  <div className="lg:w-1/4 md:w-2/5 w-2/5 flex flex-col">
                    {type === "session" ? (
                      <div>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Session Key
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Status
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          End Time
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Email
                        </p>
                        <p className="text-[#637381] font-medium my-[15px]">
                          Phone
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {type === "session" ? (
                      <div>
                        <p className="text-black font-semibold my-[15px]">
                          {item.sessionKey || "Not Available"}
                        </p>
                        <div className={getStatusStyle(item.status)}>
                          {formatStatus(item.status) || "Not Available"}
                        </div>
                        <p className="text-black font-semibold my-[15px]">
                          {formatDateTime(item.endTime) || "Not Available"}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-black font-semibold my-[15px]">
                          {item.email || "Not Available"}
                        </p>
                        <p className="text-black font-semibold my-[15px]">
                          {item.phone || "Not Available"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="w-full bg-black bg-opacity-50 md:my-[50px] my-[30px]" />
        </div>
      )}
    </>
  );
};

export default Details;
