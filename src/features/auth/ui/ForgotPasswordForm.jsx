import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";
import { EmailIcon } from "@assets/icons";
import { ForgotPw, Logo } from "@assets/images";


const ForgotPasswordForm = () => {
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (values) => {
    try {
      console.log("Reset password for:", values.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsReset(true);
    } catch (error) {
      message.error(error.message || "Failed to process request. Please try again.");
    }
  };

  const handlePasswordSubmit = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      console.log("New password set:", values.password);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Your password has been successfully changed.");
      navigate("/reset-password-success");
    } catch (error) {
      message.error(error.message || "Failed to process request. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <img src={Logo} alt="Logo" className="w-[147px] h-[34px] mt-[42px] md:ml-[21px] lg:ml-[16px] xl:ml-[20px]" />
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-evenly mt-10">
        <div className="w-full sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[600px] xl:w-[658px] xl:h-[697px] bg-white p-[40px] rounded-lg shadow-lg">
        {!isReset && (
            <Link to="/login" className="mb-2 text-[#111928] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold flex items-center self-start no-underline hover:no-underline">
              <span className="mr-2">&lt;</span> Back to Login
            </Link>)}  
          <h2 className="text-[28px] md:text-[30px] lg:text-[42px] xl:text-[45px] font-bold text-[#111928] mb-4 leading-tight">{isReset ? "Create new password" : "Forgot password?"}</h2>
          <p className="text-gray-600 text-sm mb-4 md:text-[12.5px] lg:text-[18px] xl:text-[20px]">
            {isReset
              ? "Your previous password has been reset. Please set a new password for your account."
              : "Don’t worry! Enter your email below to recover your password"}
          </p>
          <Form onFinish={isReset ? handlePasswordSubmit : handleEmailSubmit} layout="vertical">
            {!isReset ? (
              <Form.Item
                label={
                  <>
                    Email <span className="ml-1 text-red-500">*</span>
                  </>
                }
                name="email"
                required={false}
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input className="h-[40px]" placeholder="Enter your email here" suffix={<img src={EmailIcon} alt="email icon" style={{ width: 16 }} />} />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  label={
                    <>
                      New password <span className="ml-1 text-red-500">*</span>
                    </>
                  }
                  name="password"
                  required={false}
                  rules={[
                    { required: true, message: "New password is required." },
                    { min: 8, message: "Password must be at least 8 characters." },
                  ]}
                >
                  <Input.Password className="h-[40px]" placeholder="********" iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Confirm new password <span className="ml-1 text-red-500">*</span>
                    </>
                  }
                  name="confirmPassword"
                  required={false}
                  rules={[
                    { required: true, message: "Confirm new password is required." },
                  ]}
                >
                  <Input.Password className="h-[40px]" placeholder="********" iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </>
            )}
            <div className="flex justify-center w-full">
              <Button type="primary" htmlType="submit" className="w-[250px] h-[50px] bg-[#3758F9] text-white rounded-[50px] mt-4 flex justify-center items-center">
                {isReset ? "Submit" : "Reset password"}
              </Button>
            </div>
          </Form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src={ForgotPw} alt="Forgot Password Illustration" className="w-full max-w-[650px] h-auto sm:w-[400px] md:w-[500px] lg:w-[650px] xl:w-[661px] xl:h-[697px]" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;