import React, { useState, useMemo } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CloseCircleIcon from "@/assets/icons/close-circle.svg";

// Mock data
const dataSource = Array.from({ length: 50 }, (_, index) => ({
  key: index.toString(),
  studentName: `Student ${index + 1}`,
  studentId: (index + 1).toString(),
  className: `CLASS${(index % 5) + 1}`,
}));

const StudentMonitoring = ({ searchKeyword }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Thêm state cho pageSize

  const totalItems = dataSource.length;

  //   const handleApprove = (record) => {
  //     console.log("Approved:", record);
  //   };

  //   const handleReject = (record) => {
  //     console.log("Rejected:", record);
  //   };

  const handleBulkApprove = () => {
    console.log("Bulk approve:", selectedRowKeys);
  };

  const handleBulkReject = () => {
    console.log("Bulk reject:", selectedRowKeys);
  };

  // Searching functionality
  const filteredData = useMemo(() => {
  if (!searchKeyword) return dataSource;
  return dataSource.filter(
    (item) =>
      item.studentName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.className.toLowerCase().includes(searchKeyword.toLowerCase())
  );
}, [searchKeyword, dataSource]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    columnWidth: "50px",
    renderCell: (checked, record, index, originNode) => (
      <div className="flex justify-center">{originNode}</div>
    ),
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      align: "center",
      render: (text) => (
        <span className="text-[#637381] text-[14px]">{text}</span>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      align: "center",
      render: (text) => (
        <span className="text-[#637381] text-[14px]">{text}</span>
      ),
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      align: "center",
      render: (text) => (
        <span className="text-[#637381] text-[14px]">{text}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center space-x-4">
          <img
            src={CheckCircleIcon}
            alt="Check Circle"
            onClick={() => {
              alert("hi");
            }}
            className="h-7 text-[#22AD5C] hover:text-green-600 hover:cursor-pointer"
          />
          <img
            src={CloseCircleIcon}
            alt="Close Circle"
            onClick={() => {
              alert("hi");
            }}
            className="h-7 text-[#F23030] hover:text-red-600 hover:cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const onShowSizeChange = (current, size) => {
    setCurrentPage(current);
    setPageSize(size);
  };
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length,
    showSizeChanger: true,
    onShowSizeChange: onShowSizeChange,
    onChange: (page) => setCurrentPage(page),
    showTotal: (total, range) => (
      <span className="text-[16px] text-[#637381]">
        Showing {range[0].toString().padStart(2)}-
        {range[1].toString().padStart(2)} of {total}
      </span>
    ),
  };

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center">
        {selectedRowKeys.length > 0 && (
          <div className="flex">
            <div
              className="text-[#637381] rounded-none text-sm h-8 px-3 hover:font-bold hover:text-[#22AD5C] hover:underline hover:cursor-pointer"
              onClick={handleBulkApprove}
            >
              Approve
            </div>
            <div>|</div>
            <div
              className="text-[#637381] rounded-none text-sm h-8 px-3 hover:font-bold hover:text-[#F23030] hover:underline hover:cursor-pointer"
              onClick={handleBulkReject}
            >
              Reject
            </div>
          </div>
        )}
        {/* <Input
          placeholder="Search by student name"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-64 rounded-md h-8 mb-4"
        /> */}
      </div>

      {/* Table */}
      <Table
        scroll={{ y: 400 }}
        rowSelection={rowSelection}
        // @ts-ignore
        columns={columns}
        dataSource={filteredData}
        pagination={paginationConfig}
        className="border border-gray-200 rounded-lg overflow-hidden"
        rowClassName="hover:bg-gray-50"
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                className="!bg-[#E6F0FA] text-[16px] !text-[#637381] font-medium uppercase tracking-wider text-center py-3 px-4"
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default StudentMonitoring;
