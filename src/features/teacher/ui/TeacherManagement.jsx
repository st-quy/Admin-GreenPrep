import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Pagination, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateTeacherModal from '@features/teacherManagement/ui/CreateTeacherModal';

const { Option } = Select;

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([
    { id: 'KEY01', name: 'Teacher A', email: 'teacher@gmail.com', phone: '0905 123 123', status: 'Active' },
    { id: 'KEY02', name: 'Teacher A', email: 'teacher@gmail.com', phone: '0905 123 123', status: 'Active' },
    { id: 'KEY03', name: 'Teacher A', email: 'teacher@gmail.com', phone: '0905 123 123', status: 'Deactive' },
    { id: 'KEY04', name: 'Teacher A', email: 'teacher@gmail.com', phone: '0905 123 123', status: 'Deactive' },
  ]);

  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 5;

  const isAdmin = true;

  useEffect(() => {
    let filtered = teachers;
    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(teacher => teacher.status === statusFilter);
    }
    setFilteredTeachers(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, teachers]);

  if (!isAdmin) {
    return <div className="p-4 text-red-500">Access Denied: Admins only</div>;
  }

  const totalItems = filteredTeachers.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredTeachers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateTeacher = (newTeacher) => {
    setTeachers([...teachers, { ...newTeacher, id: `KEY${teachers.length + 1}` }]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const columns = [
    {
      title: 'TEACHER NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TEACHER ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'gray'}>{status}</Tag>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
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
            backgroundColor: '#E6F0FA', // Set the background color to #E6F0FA
            textAlign: 'center', // Center the text in the header cells
          }}
        />
      ),
    },
    body: {
      cell: (props) => (
        <td
          {...props}
          style={{
            ...props.style,
            border: 'none', // Remove inner borders for table cells
            textAlign: 'center', // Center the text in the body cells
          }}
        />
      ),
      row: (props) => (
        <tr
          {...props}
          style={{
            ...props.style,
            border: 'none', // Remove inner borders for table rows
          }}
        />
      ),
    },
  };

  return (
    <div className="p-6">
      {/* Header Section */}
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#2563eb', borderColor: '#2563eb' }}
        >
          Create new account
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={currentItems}
        pagination={false}
        rowKey="id"
        bordered // Keep the outer border
        className="mb-4"
        components={tableComponents} // Add the custom components to override the header and remove inner borders
      />

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
        </span>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Create Teacher Modal */}
      <CreateTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTeacher}
      />
    </div>
  );
};

export default TeacherManagement;