import React, { useEffect, useState } from "react";

const Details = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => {
        if (type === "session") {
          setData(jsonData.sessions); 
        } else if (type === "student") {
          setData(jsonData.students)
        }
      });
  }, [type]);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "px-[10px] py-[3px] bg-greenLight6 flex items-center justify-center rounded-full text-greenDark font-medium m-[12px]";
      case "Ongoing":
        return "px-[10px] py-[3px] bg-blueLight5 flex items-center justify-center rounded-full text-blueDark font-medium m-[12px]";
      case "Not started":
        return "px-[10px] py-[3px] bg-dark8 flex items-center justify-center rounded-full text-dark3 font-medium m-[12px]";
      default:
        return "";
    }
  };

  return (
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
                      {item.sessionName}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.participants}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.sessionDate}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.studentName}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.studentID}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.className}
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
                      {item.sessionKey}
                    </p>
                    <div className={getStatusStyle(item.status)}>
                      {item.status}
                    </div>
                    <p className="text-black font-semibold m-[15px]">
                      {item.endTime}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-black font-semibold m-[15px]">
                      {item.email}
                    </p>
                    <p className="text-black font-semibold m-[15px]">
                      {item.phone}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="w-full bg-black bg-opacity-50 my-[50px]"></hr>
    </div>
  );
};

export default Details;