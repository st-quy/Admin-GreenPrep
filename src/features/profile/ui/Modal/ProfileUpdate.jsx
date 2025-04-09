import React from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { useUpdateProfile } from "@features/auth/hooks/index";
import { UpdateProfileSchema } from "@features/profile/schema";
import { yupSync } from "@shared/lib/utils";
import { useSelector } from 'react-redux';

const ProfileUpdate = ({ isOpen, onClose, userData }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { user } = useSelector((state) => state.auth);

  const handleFinish = (values) => {
    updateProfile(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const [form] = Form.useForm();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    class: user?.class,
    studentCode: user?.studentCode,
    phone: user?.phone,
  };


  return (
    <Modal
      open={isOpen}
      footer={null}
      centered
      width="70%"
      onCancel={onClose}
      className="w-[90%] md:w-[80%] lg:w-[1242px] max-w-[1242px]"
    >
      <div className="p-4 md:p-6 lg:p-8">
        <Typography.Title level={2} className="font-bold mb-1 text-2xl md:text-3xl">
          Update Profile
        </Typography.Title>
        <p className="text-gray-600 mb-3">
          Keep your profile up to date by editing your personal information.
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={initialValues}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >
          <Form.Item
            label={
              <div className="flex mb-1">
                <span>First Name</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
            }
            name="firstName"
            required={false}
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex">
                <span>Last Name</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
            }
            name="lastName"
            required={false}
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex">
                <span>Email</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
            }
            name="email"
            required={false}
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" disabled />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex">
                <span>Class Name</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
            }
            name="class"
            required={false}
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex">
                <span>Student ID</span>
                <span className="text-red-500 ml-1">*</span>
              </div>
            }
            name="studentCode"
            required={false}
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" disabled />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[yupSync(UpdateProfileSchema)]}
            className="!w-[458px] !h-[80px]"
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                onClose();
                form.resetFields();
              }}
              className="w-[100px] h-[50px] rounded-full"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isPending}
              className="w-[100px] h-[50px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
