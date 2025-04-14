import React from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { useUpdateProfile } from "@features/auth/hooks/index";
import { UpdateProfileSchema } from "@features/profile/schema";
import { yupSync } from "@shared/lib/utils";
import { useSelector } from 'react-redux';

const ProfileUpdate = ({ isOpen, onClose}) => {
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
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    code: user?.teacherCode,
    bod: user?.bod,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
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
          <div className="flex flex-col md:items-start">
            <Form.Item
              label={
                <div className="flex mb-1 font-medium">
                  <span>Full name</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
              }
              name="fullName"
              required={false}
              rules={[yupSync(UpdateProfileSchema)]}
              className="w-full"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex font-medium">
                  <span>Code</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
              }
              name="code"
              required={false}
              rules={[yupSync(UpdateProfileSchema)]}
              className="w-full"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" disabled/>
            </Form.Item>

            <Form.Item
              label={
                <div className="flex font-medium">
                  <span>BOD</span>
                </div>
              }
              name="bod"
              required={false}
              rules={[yupSync(UpdateProfileSchema)]}
              className="w-full"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" placeholder="dd/mm/yyyy" disabled/>
            </Form.Item>
          </div>

          <div className="flex flex-col md:items-end">
            <Form.Item
              label={
                <div className="flex font-medium">
                  <span>Email</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
              }
              name="email"
              required={false}
              rules={[yupSync(UpdateProfileSchema)]}
              className="w-full md:max-w-[458px]"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" disabled />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex font-medium">
                  <span>Phone number</span>
                </div>
              }
              name="phone"
              rules={[yupSync(UpdateProfileSchema)]}
              className="w-full md:max-w-[458px]"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex font-medium">
                  <span>Address</span>
                </div>
              }
              name="address"
              className="w-full md:max-w-[458px]"
            >
              <Input className="h-[46px] w-full max-w-[458px] rounded-lg" />
            </Form.Item>
          </div>

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
