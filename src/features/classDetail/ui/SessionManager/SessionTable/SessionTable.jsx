import React from "react";
import { Pagination } from "antd";
import ActionModal from "../../SessionModal/ActionModal/ActionModal";
import { formatDateTime } from "@shared/lib/utils/formatString";
import DeleteModal from "../../SessionModal/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";

const SessionTable = ({ dataSource }) => {
  const tableHeaders = [
    "SESSION NAME",
    "SESSION KEY",
    "START TIME",
    "END TIME",
    "NUMBER OF PARTICIPANTS",
    // "STATUS",
    "ACTION",
  ];
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/class/session/${id}`);
  };

  return (
    <>
      <table className="w-full overflow-hidden border border-[#E0E0E0] rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.2)]">
        <thead className="bg-[#EEEEEE]">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="p-6 text-[14px] font-[500] md:text-[14px] lg:text-[16px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {dataSource && dataSource.length > 0 ? (
            dataSource.reverse().map((item, index) => (
              <tr
                key={index}
                className="text-[14px] font-[500] text-[#637381] md:text-[14px] lg:text-[16px]"
              >
                <td className="p-4 text-[#003087]">
                  <a onClick={() => handleNavigate(item.ID)}>
                    {item.sessionName}
                  </a>
                </td>
                <td className="p-4">{item.sessionKey}</td>
                <td className="p-4">{formatDateTime(item.startTime)}</td>
                <td className="p-4">{formatDateTime(item.endTime)}</td>
                <td className="p-4">{item.numberOfParticipants}</td>
                {/* <td className="p-4">{item.status}</td> */}
                <td className="flex justify-center items-center gap-4 p-4">
                  <ActionModal isEdit={true} initialData={item} />
                  <DeleteModal sessionID={item.ID} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="flex justify-end">
        <Pagination
          total={85}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={20}
          defaultCurrent={1}
          className="!mt-6"
        />
      </div> */}
    </>
  );
};

export default SessionTable;
