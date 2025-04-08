import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Pagination,
  Tag,
  Space,
  Spin,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useFetchTeachers } from "../hook/useTeacherQuery";
import TeacherActionModal from "./TeacherModal/ActionModal/TeacherActionModal";
import useConfirm from "@shared/hook/useConfirm";
import { useDebouncedValue } from "@shared/hook/useDebounceValue";
const { Option } = Select;

const TeacherManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { openConfirmModal, ModalComponent } = useConfirm();
  const [pageSize, setPageSize] = useState(2);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  const { data: teachersData, isLoading } = useFetchTeachers({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchTerm,
    status: statusFilter,
  });

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
  const handleStatusFilter = (value) => {
    const fil = value === "Active" ? true : false;
    setStatusFilter(fil);
  };
  const columns = [
    {
      title: "TEACHER NAME",
      dataIndex: ["fullname"],
      key: "name",
      width: "200px",
      render: (text, record) => (
        <a
          onClick={() => console.log(record)}
          className="cursor-pointer text-[10px] md:text-[14px] underline  hover:opacity-80"
        >
          {`${record.firstName} ${record.lastName}` || "Unknown"}
        </a>
      ),
    },
    {
      title: "TEACHER ID",
      dataIndex: "teacherCode",
      key: "id",
      width: "100px",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: "200px",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      width: "100px",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "80px",
      render: (status) => (
        <Tag
          className={`rounded-3xl font-[600] py-1 text-center ${status === true ? "bg-[#DAF8E6] text-[#1A8245]" : "bg-[#E5E7EB] text-[#374151]"} border-none text-[10px] md:text-[14px] `}
        >
          {status === true ? "Active" : "Deactive"}
        </Tag>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: "100px",
      fixed: "right",
      render: (_, record) => (
        <Space
          size="small"
          className="bg-white rounded-lg shadow-md shadow-black px-1 md:shadow-none"
        >
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
            backgroundColor: "#E6F0FA",
            textAlign: "center",
          }}
          className="text-[#637381] px-0 font-medium text-[10px] md:text-[14px] border-none"
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
          className="text-[#637381] px-0 font-medium text-[10px] md:text-[14px] border-none"
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
            value={searchTerm}
            placeholder="Search by name, ID"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ width: 200 }}
            allowClear
            suffix={<SearchOutlined className=" text-[#9CA3AF]" />}
          />
          <Select
            placeholder="Select STATUS"
            onChange={(value) => handleStatusFilter(value)}
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
        // @ts-ignore
        columns={columns}
        dataSource={teachersData?.data?.teachers}
        rowKey="id"
        scroll={{ x: 600 }}
        className="mb-4"
        components={tableComponents}
        loading={isLoading || !teachersData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: teachersData?.data?.pagination?.total,
          showSizeChanger: true,
          pageSizeOptions: ["3", "10", "15", "20"],
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total}`,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
      />
    </div>
  );
};
export default TeacherManagement;
