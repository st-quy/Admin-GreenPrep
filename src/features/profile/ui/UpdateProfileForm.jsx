import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { profileSchema, yupSync } from '../schema/profileSchema';
import toast, { Toaster } from 'react-hot-toast';

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({});

  const onFinish = (values) => {
    profileSchema.validate(values, { abortEarly: false })
      .then(() => {
        toast.success('Profile updated successfully!');
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error('Please check your input and try again');
      });
  };

  const onCancel = () => {
    form.resetFields();
    setErrors({});
    toast.error('Changes have been cancelled');
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="flex-1 md:w-full max-w-fit md:max-w-[1242px] h-auto md:h-[611px] mx-auto rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]">
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-white rounded-lg w-auto md:w-full h-full flex flex-col justify-center items-center"
        initialValues={{
          fullname: "Thao Nguyen",
          email: "thao.nguyen@gmail.com",
          code: "TN09090",
          phoneNumber: "0902889343",
          bod: "12/09/1989",
          address: "",
        }}
      >
        <div className="mb-[2.5%] text-left w-[90%] mt-[5%] md:mt-[0px]">
          <h4 className="text-black text-[2rem] font-bold leading-[2.375rem] mb-[0.75rem]">
            Update profile
          </h4>
          <p className="text-[#637381] text-[1.125rem] font-medium leading-[1.625rem]">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-[25px] w-[90%] mx-auto">
          <Form.Item
            label={<span>Fullname <span className="text-[#FF0000]">*</span></span>}
            name="fullname"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-start w-[458px] h-[80px] max-w-full"
          >
            <Input className="h-[46px] text-[16px]" />
          </Form.Item>

          <Form.Item
            label={<span>Email <span className="text-[#FF0000]">*</span></span>}
            name="email"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-end w-[458px] h-[80px] max-w-full"
          >
            <Input className="h-[46px] text-[16px]" />
          </Form.Item>

          <Form.Item
            label={<span>Code <span className="text-[#FF0000]">*</span></span>}
            name="code"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-start w-[458px] h-[80px] max-w-full"
          >
            <Input className="h-[46px] text-[16px]" />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-end w-[458px] h-[80px] max-w-full"
          >
            <Input className="h-[46px] text-[16px]" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="bod"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-start w-[458px] h-[80px] max-w-full"
          >
            <Input placeholder="dd/mm/yyyy" className="h-[46px] text-[16px]" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ validator: yupSync(profileSchema).validator }]}
            className="md:justify-self-end w-[458px] h-[80px] max-w-full"
          >
            <Input className="h-[46px] text-[16px]" />
          </Form.Item>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-[10px] mt-[40px] w-[100%] md:w-[90%] mb-[5%] md:mb-[0px]">
          <Button
            onClick={onCancel}
            className="h-[50px] w-[113px] text-[#003087] text-base font-medium rounded-[50px] border border-[#003087] hover:bg-[#003087] hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[50px] w-[113px] bg-[#003087] text-white text-base font-medium rounded-[50px] border-none hover:bg-[#002266] transition-colors"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateProfileForm;
