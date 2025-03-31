import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { profileSchema } from '../schema/profileButtonsSchema';

const ProfileUpdate = ({ isOpen, onClose, userData }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await profileSchema.validate(values, { abortEarly: false });
      console.log("Form submitted successfully:", values);
      message.success("Profile updated successfully");
      onClose();
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      console.log("Validation errors:", errors);
      message.error("Please check your input and try again");
    }
  };

  return (
    <Modal
      title={
        <div className="mb-4">
          <h4 className="text-2xl font-bold mb-2">Update profile</h4>
          <p className="text-gray-500">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        initialValues={{
          fullname: userData?.fullName || "",
          email: userData?.email || "",
          code: userData?.code || "",
          phoneNumber:
            userData?.phoneNumber !== "No information" ? userData?.phoneNumber : "",
          bod: userData?.bod !== "No information" ? userData?.bod : "",
          address: userData?.address !== "No information" ? userData?.address : "",
        }}
      >
        <Form.Item
          label="Fullname"
          name="fullname"
          rules={[{ required: true, message: "Fullname is required" }]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: "Code is required" }]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^[0-9]{9,10}$/,
              message: "Phone number must be 9-10 digits",
            },
          ]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="bod"
          rules={[
            {
              pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              message: "Date must be in format dd/mm/yyyy",
            },
          ]}
        >
          <Input placeholder="dd/mm/yyyy" className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            className="h-[50px] w-[113px] rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[50px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileUpdate; 