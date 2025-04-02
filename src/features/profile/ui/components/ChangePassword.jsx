// @ts-nocheck
import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { passwordSchema } from '../../schema/profileButtonsSchema';
import { changePasswordFromApi } from '../../api';
import { useMutation } from '@tanstack/react-query';
import { getUserFromToken } from '../../api';
import { useQuery } from '@tanstack/react-query';

const ChangePassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const { data: userData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserFromToken,
    enabled: isOpen, // Chỉ fetch khi modal mở
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ userId, data }) => changePasswordFromApi(userId, data),
    onSuccess: () => {
      message.success("Password changed successfully");
      form.resetFields();
      onClose();
    },
    onError: (error) => {
      console.error('Error changing password:', error);
      if (error.response?.status === 400) {
        message.error("Incorrect current password");
        form.setFields([
          {
            name: "oldPassword",
            errors: ["Incorrect current password"],
          },
        ]);
      } else {
        message.error("Failed to change password. Please try again.");
      }
    }
  });

  React.useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const validateField = async (fieldName, value) => {
    try {
      await passwordSchema.validateAt(fieldName, form.getFieldsValue());
      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Lấy chỉ các trường cần thiết từ form
      const { oldPassword, newPassword } = values;

      if (!userData?.ID) {
        message.error("Không thể lấy thông tin người dùng");
        return;
      }

      // Gọi API thay đổi mật khẩu
      changePasswordMutation.mutate({
        userId: userData.ID,
        data: { oldPassword, newPassword }
      });
    } catch (err) {
      message.error("Failed to change password. Please try again.");
    }
  };

  return (
    <Modal
      title={
        <div className="mb-4">
          <h4 className="text-xl font-bold mb-2">Change Password</h4>
          <p className="text-gray-500">
            Secure your account with a new password.
          </p>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={
            <span className="font-medium">
              Current password <span className="text-red-500">*</span>
            </span>
          }
          name="oldPassword"
          rules={[
            { required: true, message: 'Please enter your current password' }
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your current password"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              New password <span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your new password"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Confirm new password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Confirm your new password"
          />
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            className="h-[46px] w-[113px] rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[46px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
            loading={changePasswordMutation.isPending}
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePassword; 