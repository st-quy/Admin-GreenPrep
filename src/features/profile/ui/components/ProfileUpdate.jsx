import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { profileSchema } from '../../schema/profileButtonsSchema';

const ProfileUpdate = ({ isOpen, onClose, userData }) => {
  const [form] = Form.useForm();

  const validateField = async (fieldName, value) => {
    try {
      await profileSchema.validateAt(fieldName, form.getFieldsValue());
      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

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
      Object.keys(errors).forEach((field) => {
        form.setFields([
          {
            name: field,
            errors: [errors[field]],
          },
        ]);
      });
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
          label={
            <span className="font-medium">
              Fullname <span className="text-red-500">*</span>
            </span>
          }
          name="fullname"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg" 
            onChange={(e) => validateField("fullname", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Email <span className="text-red-500">*</span>
            </span>
          }
          name="email"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("email", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Code <span className="text-red-500">*</span>
            </span>
          }
          name="code"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("code", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNumber"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("phoneNumber", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="bod"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            placeholder="dd/mm/yyyy" 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("bod", e.target.value)}
          />
        </Form.Item>

        <Form.Item 
          label="Address" 
          name="address"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("address", e.target.value)}
          />
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