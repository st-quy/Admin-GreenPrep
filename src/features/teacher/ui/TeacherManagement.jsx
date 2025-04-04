import React, { useState, useEffect, useMemo } from "react";
import { Table, Input, Select, Button, Pagination, Tag, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Teachers } from "../constant/teachers";
import TeacherActionModal from "./TeacherModal/ActionModal/TeacherActionModal";
import useConfirm from "@shared/hook/useConfirm";
const { Option } = Select;

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(Teachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const isAdmin = true;
  const { openConfirmModal, ModalComponent } = useConfirm();
  const filteredData = useMemo(() => {
    const keyword = searchTerm?.toLowerCase().trim() || "";
    const statusFil = statusFilter?.toLowerCase().trim() || "";
    console.log(keyword);
    if (!keyword) return teachers;
    return teachers.filter((item) => {
      const fullName = String(item.name || "").toLowerCase();
      const sessionName = String(item.id || "").toLowerCase();
      const statusFilter = String(item.status || "").toLowerCase();
      return (
        (sessionName.includes(keyword) || fullName.includes(keyword)) &&
        statusFilter.includes(statusFil)
      );
    });
  }, [searchTerm, statusFilter, teachers]);

  if (!isAdmin) {
    return <div className="p-4 text-red-500">Access Denied: Admins only</div>;
  }
  const handleDelete = (data) => {
    openConfirmModal({
      title: "Delete Confirmation",
      message: "Are you sure you want to delete this item?",
      okText: "Delete",
      okButtonColor: "red",
      onConfirm: () => {
        console.log("Item deleted!");
      },
    });
  };
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const columns = [
    {
      title: "TEACHER NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "TEACHER ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className={`rounded-3xl min-w-[80px] font-[600] py-1 text-center ${status === "Active" ? "bg-[#DAF8E6] text-[#1A8245]" : "bg-[#E5E7EB] text-[#374151]"} border-none`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <TeacherActionModal initialData={record} />

          <Button
            type="text"
            icon={<DeleteOutlined style={{ fontSize: "20px" }} />}
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const tableComponents = {
    header: {
      cell: (props) => (
        <th
          {...props}
          style={{
            ...props.style,
            backgroundColor: "#E6F0FA", // Set the background color to #E6F0FA
            textAlign: "center", // Center the text in the header cells
          }}
          className="text-[#637381] font-medium text-[10px] md:text-[14px] border-none" // Remove inner borders for header cells
        />
      ),
    },
    body: {
      cell: (props) => (
        <td
          {...props}
          style={{
            ...props.style,
            borderRightStyle: "none",
            textAlign: "center",
          }}
          className="text-[#637381] font-medium text-[10px] md:text-[14px] border-none"
        />
      ),
      row: (props) => (
        <tr
          {...props}
          style={{
            ...props.style,
            border: "none",
          }}
        />
      ),
    },
  };

  return (
    <div className="w-full">
      <ModalComponent />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search by name, ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
            allowClear
          />
          <Select
            placeholder="Select STATUS"
            onChange={(value) => setStatusFilter(value)}
            style={{ width: 150 }}
            allowClear
          >
            <Option value="Active">Active</Option>
            <Option value="Deactive">Deactive</Option>
          </Select>
        </div>
        <TeacherActionModal />
      </div>
      <Table
        columns={columns}
        dataSource={currentItems}
        rowKey="id"
        bordered
        className="mb-4"
        components={tableComponents}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalItems,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`,
          onChange: (page, size) => {
            setCurrentPage(page);
          },
        }}
      />
    </div>
  );
};
export default TeacherManagement;
