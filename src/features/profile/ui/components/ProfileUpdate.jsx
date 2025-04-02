// @ts-nocheck
import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { updateDataFromApi, QUERY_KEYS } from '../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ProfileUpdate = ({ isOpen, onClose, userData }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data) => updateDataFromApi(userData.ID, data),
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData([QUERY_KEYS.USER_PROFILE]);

      // Optimistically update to the new value
      queryClient.setQueryData([QUERY_KEYS.USER_PROFILE], {
        ...previousData,
        ...newData
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, newData, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData([QUERY_KEYS.USER_PROFILE], context.previousData);
      message.error("Failed to update profile. Please try again.");
    },
    onSuccess: (updatedData) => {
      message.success("Profile updated successfully");
      onClose();
    },
    onSettled: () => {
      // Always refetch after error or success to make sure our optimistic update is correct
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    }
  });

  React.useEffect(() => {
    if (isOpen && userData) {
      form.setFieldsValue({
        fullname: userData.lastName + ' ' + userData.firstName,
        email: userData.email,
        code: userData.teacherCode,
        phoneNumber: userData.phone !== "No information" ? userData.phone : "",
        bod: userData.bod !== "No information" ? userData.bod : "",
        address: userData.address !== "No information" ? userData.address : "",
      });
    }
  }, [isOpen, userData, form]);

  const handleSubmit = async (values) => {
    const nameParts = values.fullname.trim().split(' ');
    const lastName = nameParts[0];
    const firstName = nameParts.slice(1).join(' ');

    const updateData = {
      firstName,
      lastName,
      email: values.email,
      phone: values.phoneNumber || "No information",
      teacherCode: values.code,
      bod: values.bod || "No information",
      address: values.address || "No information"
    };

    updateMutation.mutate(updateData);
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
          fullname: "",
          email: "",
          code: "",
          phoneNumber: "",
          bod: "",
          address: "",
        }}
      >
        <Form.Item
          label={
            <span className="font-medium">
              Fullname <span className="text-red-500">*</span>
            </span>
          }
          name="fullname"
          rules={[{ required: true, message: 'Please input your fullname!' }]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Email <span className="text-red-500">*</span>
            </span>
          }
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input className="h-[46px] rounded-lg" disabled />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Code <span className="text-red-500">*</span>
            </span>
          }
          name="code"
          rules={[{ required: true, message: 'Please input your code!' }]}
        >
          <Input className="h-[46px] rounded-lg" disabled />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Phone number must be 10 digits!' }
          ]}
        >
          <Input className="h-[46px] rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="bod"
        >
          <Input 
            placeholder="dd/mm/yyyy" 
            className="h-[46px] rounded-lg"
          />
        </Form.Item>

        <Form.Item 
          label="Address" 
          name="address"
        >
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
            loading={updateMutation.isPending}
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileUpdate; 