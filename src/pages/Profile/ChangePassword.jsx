import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "@features/auth/hooks";
import { ChangePasswordSchema } from "./schema";
import { yupSync } from "@shared/lib/utils";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    changePassword({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col px-10">
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer w-fit  hover:font-bold"
        onClick={() => navigate("/profile")}
      >
        <LeftOutlined />
        <Typography.Text className="text-sm inline-block">
          Back to profile
        </Typography.Text>
      </div>
      <Typography.Title className="font-bold mb-2">
        Change password
      </Typography.Title>
      <p className="text-gray-600 mb-6">
        Secure your account with a new password.
      </p>
      <Card className="w-full">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          size="large"
        >
          <Form.Item
            label="Current password"
            name="currentPassword"
            required
            rules={[yupSync(ChangePasswordSchema)]}
          >
            <Input.Password placeholder="Current password" />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            required
            rules={[yupSync(ChangePasswordSchema)]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
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
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
