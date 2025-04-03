import { useState, useMemo, useEffect } from "react";
import { Table, message } from "antd";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import CloseCircleIcon from "@/assets/icons/close-circle.svg";
import ConfirmationModal from "@shared/Modal/ConfirmationModal";
import axios from "@shared/config/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSION_ID, API_ENDPOINTS } from "../api";

const StudentMonitoring = ({
  sessionId = SESSION_ID,
  searchKeyword,
  onPendingCountChange,
}) => {
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

  const queryClient = useQueryClient();

  const fetchSessionRequests = async () => {
    if (!sessionId) return [];
    const response = await axios.get(API_ENDPOINTS.SESSION_REQUESTS(sessionId));
    const requestsData = response.data.data || [];
    const pendingRequests = requestsData
      .filter((req) => req.status === "pending")
      .map((req, index) => ({
        key: req.ID || index.toString(),
        studentName: req.User?.fullName || "null",
        studentId: req.User?.studentCode || "null",
        className: req.User?.class || "null",
        requestId: req.ID,
      }));
    return pendingRequests;
  };

  const { data: dataSource = [], isLoading } = useQuery({
    queryKey: ["sessionRequests", sessionId],
    queryFn: fetchSessionRequests,
    refetchInterval: 10000,
    enabled: !!sessionId,
  });

  // Searching functionality
  const filteredData = useMemo(() => {
    if (!searchKeyword) return dataSource;
    return dataSource.filter((item) => {
      return (
        item.studentName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.className.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
  }, [dataSource, searchKeyword]);

  useEffect(() => {
    if (onPendingCountChange) {
      onPendingCountChange(filteredData.length);
    }
  }, [filteredData, onPendingCountChange]);

  // Mutation cho approve request
  const approveMutation = useMutation({
    mutationFn: (requestId) =>
      axios.patch(API_ENDPOINTS.APPROVE_REQUEST(sessionId), {
        requestId,
      }),
    onSuccess: (_, requestId) => {
      message.success("Request has been approved!");
      queryClient.setQueryData(["sessionRequests", sessionId], (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((req) => req.requestId !== requestId);
        }
        return [];
      });
    },
    onError: (error) => {
      message.error("Error approving request: " + error.message);
    },
  });

  // Mutation cho reject request
  const rejectMutation = useMutation({
    mutationFn: (requestId) =>
      axios.patch(API_ENDPOINTS.REJECT_REQUEST(sessionId), {
        requestId,
      }),
    onSuccess: (_, requestId) => {
      message.success("Request has been rejected!");
      queryClient.setQueryData(["sessionRequests", sessionId], (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((req) => req.requestId !== requestId);
        }
        return [];
      });
    },
    onError: (error) => {
      message.error("Error rejecting request: " + error.message);
    },
  });

  const handleApprove = (record) => {
    setModalConfig({
      title: "Are you sure you want to approve this student?",
      message:
        "After you approve this student, this account will be able to take the test.",
      okText: "Approve",
      okButtonColor: "#22AD5C",
      onConfirm: () => {
        approveMutation.mutate(record.requestId);
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleReject = (record) => {
    setModalConfig({
      title: "Are you sure you want to reject this student?",
      message:
        "After you reject this student, this account will no longer be available in this pending list.",
      okText: "Reject",
      okButtonColor: "#F23030",
      onConfirm: () => {
        rejectMutation.mutate(record.requestId);
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleBulkApprove = () => {
    setModalConfig({
      title: "Are you sure you want to approve all selected students?",
      message:
        "Once you approve all students, all selected accounts will be able to take the test.",
      okText: "Approve",
      okButtonColor: "#22AD5C",
      onConfirm: async () => {
        try {
          const selectedRequests = dataSource.filter((req) =>
            selectedRowKeys.includes(req.key)
          );
          await Promise.all(
            selectedRequests.map((req) =>
              approveMutation.mutateAsync(req.requestId)
            )
          );
          message.success("All selected requests have been approved!");
          setSelectedRowKeys([]);
        } catch (error) {
          message.error("Error approving multiple requests: " + error.message);
        }
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };

  const handleBulkReject = () => {
    setModalConfig({
      title: "Are you sure you want to reject all selected students?",
      message:
        "After you reject all students, all selected accounts will no longer be available on this pending list.",
      okText: "Reject",
      okButtonColor: "#F23030",
      onConfirm: async () => {
        try {
          const selectedRequests = dataSource.filter((req) =>
            selectedRowKeys.includes(req.key)
          );
          await Promise.all(
            selectedRequests.map((req) =>
              rejectMutation.mutateAsync(req.requestId)
            )
          );
          message.success("All selected requests have been rejected!");
          setSelectedRowKeys([]);
        } catch (error) {
          message.error("Error rejecting multiple requests: " + error.message);
        }
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
        <span className="text-[#637381] text-[16px]">{text}</span>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      align: "center",
      render: (text) => (
        <span className="text-[#637381] text-[16px]">{text}</span>
      ),
    },
    {
      title: "Class Name",
      dataIndex: "className",
      key: "className",
      align: "center",
      render: (text) => (
        <span className="text-[#637381] text-[16px]">{text}</span>
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
      </div>
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
