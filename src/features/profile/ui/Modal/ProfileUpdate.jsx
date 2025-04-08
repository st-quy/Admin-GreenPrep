import React from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { useUpdateProfile } from "@features/auth/hooks/index";
import { UpdateProfileSchema } from "@features/profile/schema";
import { yupSync } from "@shared/lib/utils";

const ProfileUpdate = ({ isOpen, onClose, userData }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  

  const handleFinish = (values) => {
    updateProfile(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const [form] = Form.useForm();

  const initialValues = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    class: userData.class,
    studentCode: userData.studentCode,
    phone: userData.phone,
  };

  if (!userData) {
    return (
      <div className="flex justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Modal
      open={isOpen}
      footer={null}
      centered
      width={800}
      onCancel={onClose}
    >
      <div className="p-6">
        <Typography.Title level={3} className="font-bold mb-2">
          Update Profile
        </Typography.Title>
        <p className="text-gray-600 mb-6">
          Keep your profile up to date by editing your personal information.
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          size="large"
          className="grid grid-cols-2 gap-4"
          initialValues={initialValues}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Class Name"
            name="class"
            rules={[yupSync(UpdateProfileSchema)]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Student ID"
            name="studentCode"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                onClose();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
