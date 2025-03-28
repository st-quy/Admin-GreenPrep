import React from "react";
import DeleteIcon from "@assets/icons/class-detail/delete.png";
import { Button, Pagination } from "antd";
import ActionModal from "../../SessionModal/ActionModal/ActionModal";
import { formatDateTime } from "@shared/lib/utils/formatString";
import DeleteModal from "../../SessionModal/DeleteModal/DeleteModal";

const SessionTable = ({ dataSource }) => {
  const tableHeaders = [
    "SESSION NAME",
    "SESSION KEY",
    "START TIME",
    "END TIME",
    "NUMBER OF PARTICIPANTS",
    "STATUS",
    "ACTION",
  ];

  return (
    <>
      <table className="w-full shadow-xl rounded-lg overflow-hidden border border-[#E0E0E0]">
        <thead className="bg-[#EEEEEE]">
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="p-6">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {dataSource && dataSource.length > 0 ? (
            dataSource.map((item, index) => (
              <tr key={index}>
                <td className="p-4">{item.sessionName}</td>
                <td className="p-4">{item.sessionKey}</td>
                <td className="p-4">{formatDateTime(item.startTime)}</td>
                <td className="p-4">{formatDateTime(item.endTime)}</td>
                <td className="p-4">{item.numberOfParticipants}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4 flex justify-center items-center gap-4">
                  <ActionModal isEdit={true} initialData={item} onSubmit={""} />
                  <DeleteModal />
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
      <div className="flex justify-end">
        <Pagination
          total={85}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={20}
          defaultCurrent={1}
          className="!mt-6"
        />
      </div>
    </>
  );
};

export default SessionTable;
