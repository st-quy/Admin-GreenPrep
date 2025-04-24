import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllClass } from "@features/classManagement/hooks";
import CreateClassModal from "@features/classManagement/ui/Modal/CreateClass";
import TableSearch from "@shared/ui/TableSearch";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import UpdateClassModal from "@features/classManagement/ui/Modal/UpdateClass";
import DeleteClassModal from "@features/classManagement/ui/Modal/DeleteClass";
import { useSelector } from "react-redux";

const ClassManagement = () => {
  const [isOpen, setIsOpen] = useState("");
  const [dataClass, setClassData] = useState(null);
  const { userId, user } = useSelector((state) => state.auth);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");

  const { data: classList, isLoading } = useGetAllClass(
    user?.role.includes("admin") ? null : userId,
    page,
    limit,
    searchName
  );

  const handleUpdateClass = (record) => () => {
    setIsOpen("Update");
    setClassData(record);
  };

  const handleDeleteClass = (record) => () => {
    setIsOpen("Delete");
    setClassData(record);
  };

  const columns = [
    {
      title: "CLASS NAME",
      dataIndex: "className",
      key: "className",
      align: "center",

      render: (text, record) => (
        <Link to={`${record.ID}`} className="underline">
          {text}
        </Link>
      ), // Render class name as a link
    },
    {
      title: "NUMBER OF SESSIONS",
      dataIndex: "numberOfSessions",
      key: "numberOfSessions",
      align: "center",
      render: (text) => <div className="flex justify-center">{text}</div>, // Render number of sessions
    },
    {
      title: "ACTIONS",
      key: "actions",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-4 justify-center items-center">
          <Button
            className="text-xl !text-primaryColor"
            type="link"
            icon={<EditOutlined />}
            onClick={handleUpdateClass(record)}
          />
          {/* Edit button */}
          {record.numberOfSessions <= 0 && (
            <Button
              className="text-xl"
              type="link"
              icon={<DeleteOutlined className="text-red-500" />}
              onClick={handleDeleteClass(record)}
            />
          )}
        </div>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchName(value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePaginationChange = (page, pageSize) => {
    setLimit(pageSize);
    setPage(page);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Typography.Title level={3} className="m-0 font-bold text-black ">
            Class Management
          </Typography.Title>
          <Typography.Text className="text-primaryTextColor text-[18px]">
            Manage and organize both classes and individual sessions.
          </Typography.Text>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:space-x-0">
          <Button
            type="primary"
            className="min-w-[140px] md:min-w-[160px] h-[50px] rounded-full bg-primaryColor hover:!bg-[#002A6B] border-none font-medium"
            onClick={() => setIsOpen("Create")}
          >
            Create new class
          </Button>
        </div>
      </div>
      <TableSearch
        data={classList?.data}
        columns={columns}
        isLoading={isLoading}
        pageSize={limit}
        pageNumber={page}
        pagination={classList?.pagination}
        handleSearch={handleSearch}
        handlePaginationChange={handlePaginationChange}
      />
      <CreateClassModal
        isOpen={isOpen === "Create" ? true : false}
        onClose={() => setIsOpen(null)}
      />
      {dataClass && (
        <UpdateClassModal
          isOpen={isOpen === "Update" ? true : false}
          onClose={() => {
            setClassData(null);
            setIsOpen(null);
          }}
          data={dataClass}
        />
      )}
      <DeleteClassModal
        isOpen={isOpen === "Delete" ? true : false}
        onClose={() => setIsOpen(null)}
        classId={dataClass?.ID}
      />
    </div>
  );
};

export default ClassManagement;
