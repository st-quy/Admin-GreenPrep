import { useState } from "react";
import { Table } from "antd";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CloseCircleIcon from "@/assets/icons/close-circle.svg";
import ConfirmationModal from "@app/components/Modal/ConfirmationModal";
// Mock data
const dataSource = Array.from({ length: 50 }, (_, index) => ({
  key: index.toString(),
  studentName: `Student ${index + 1}`,
  studentId: (index + 1).toString(),
  className: `CLASS${(index % 5) + 1}`,
}));

const StudentMonitoring = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    okText: "",
    okButtonColor: "",
    onConfirm: () => {},
  });

  const totalItems = dataSource.length;

  const handleApprove = (record) => {
    setModalConfig({
      title: "Are you sure you want to approve this student?",
      message: `After you approve this student, this account will be able to take the test.`,
      okText: "Approve",
      okButtonColor: "#22AD5C",
      onConfirm: () => {
        console.log("Approved:", record);
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleReject = (record) => {
    setModalConfig({
      title: "Are you sure you want to reject this student?",
      message: `After you reject this student, this account will no longer available is this pending list.`,
      okText: "Reject",
      okButtonColor: "#F23030",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleBulkApprove = () => {
    setModalConfig({
      title: "Are you sure you want to approve all students?",
      message: `Once you approve all students, all accounts will be able to take the test.`,
      okText: "Approve",
      okButtonColor: "#22AD5C",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleBulkReject = () => {
    setModalConfig({
      title: "Are you sure you want to reject all students?",
      message: `After you reject all students, all accounts will no longer be available on this pending list.`,
      okText: "Reject",
      okButtonColor: "#F23030",
      onConfirm: () => {
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

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
            onClick={() => handleApprove(record)}
            className="h-7 text-[#22AD5C] hover:text-green-600 hover:cursor-pointer"
          />
          <img
            src={CloseCircleIcon}
            alt="Close Circle"
            onClick={() => handleReject(record)}
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
    total: totalItems,
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
      <div className="flex items-center mb-4">
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
      </div>
      {/* Table */}
      <Table
        scroll={{ y: 400 }}
        rowSelection={rowSelection}
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        okText={modalConfig.okText}
        okButtonColor={modalConfig.okButtonColor}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
};

export default StudentMonitoring;
