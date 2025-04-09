import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "@features/auth/hooks/index";
import { ChangePasswordSchema } from "@features/profile/schema";
import { yupSync } from "@shared/lib/utils";

const ChangePassword = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    changePassword(
      {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      footer={null}
      centered
      onCancel={onClose}
      className="w-[90%] md:w-[500px] lg:w-[647px] h-[649px]"
      width={647}
    >
      <div className="p-4 md:p-6 lg:p-8 h-full">
        <Typography.Title level={4} className="font-bold mb-1 text-[30px]">
          Change Password
        </Typography.Title>
        <p className="text-gray-600 mb-3 text-[18px]">
          Secure your account with a new password.
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="flex flex-col items-center h-full"
        >
          <div className="space-y-4">
            <Form.Item
              label={<span className="text-[16px]">Current password</span>}
              name="currentPassword"
              required={false}
              rules={[yupSync(ChangePasswordSchema)]}
              className="!w-[458px] !h-[80px] !mb-0"
            >
              <Input.Password className="h-[46px] rounded-lg" placeholder="Current password" />
            </Form.Item>
            <Form.Item
              label={<span className="text-[16px]">New password</span>}
              name="newPassword"
              required={false}
              rules={[yupSync(ChangePasswordSchema)]}
              className="!w-[458px] !h-[80px] !mb-0"
            >
              <Input.Password className="h-[46px] rounded-lg" placeholder="New password" />
            </Form.Item>
            <Form.Item
              label={<span className="text-[16px]">Confirm new password</span>}
              name="confirmNewPassword"
              required={false}
              dependencies={["newPassword"]}
              className="!w-[458px] !h-[80px] !mb-0"
              rules={[
                {
                  required: true,
                  message: "New password confirmation is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("New passwords must match"));
                  },
                }),
              ]}
            >
              <Input.Password className="h-[46px] rounded-lg" placeholder="Confirm new password" />
            </Form.Item>
          </div>

          <div className="w-full flex justify-end gap-3 mt-6">
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

export default ChangePassword;
