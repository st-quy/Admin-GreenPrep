import { Modal, Table, Button } from "antd";
import { EditOutlined, AudioOutlined } from "@ant-design/icons";
import "./index.css";

const StudentListModal = ({ data, visible, onClose, handleSelect }) => {
  // Define and customize the columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onHeaderCell: () => ({
        style: { backgroundColor: "transparent", color: "#637381" },
      }),
      render: (text) => <span className="text-[#003087]">{text}</span>,
    },
    {
      title: () => (
        <div className="flex items-center justify-center text-[#637381]">
          <EditOutlined className="mr-2" />
          <span>Writing</span>
        </div>
      ),
      dataIndex: "writing",
      key: "writing",
      align: "center",
      onHeaderCell: () => ({
        style: { backgroundColor: "transparent" },
      }),
    },
    {
      title: () => (
        <div className="flex items-center justify-center text-[#637381]">
          <AudioOutlined className="mr-2" />
          <span>Speaking</span>
        </div>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "transparent" },
      }),
      dataIndex: "speaking",
      key: "speaking",
      align: "center",
    },
    {
      title: "",
      key: "action",
      align: "center",
      onHeaderCell: () => ({
        style: { backgroundColor: "transparent" },
      }),
      render: (_, record) => (
        <Button
          type="primary"
          ghost
          shape="round"
          className="!border-[#003087] !text-[#003087] hover:bg-blue-50 !px-7"
          onClick={() => {
            handleSelect(record.id);
          }}
        >
          Select
        </Button>
      ),
    },
  ];

  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={1000}>
      <div className="px-12 pb-14 pt-8">
        <h2 className="text-3xl font-bold mb-4">Student List</h2>
        <Table
          dataSource={data}
          // @ts-ignore
          columns={columns}
          pagination={false}
          rowKey="id"
          scroll={{ y: 500 }}
        />
      </div>
    </Modal>
  );
};

export default StudentListModal;
