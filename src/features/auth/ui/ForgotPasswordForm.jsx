import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, LeftOutlined,MailOutlined } from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";
import { ForgotPw, Logo } from "@assets/images";
import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address Ex:ABC@bc.com").required("Email is required"),
});

const passwordSchema = yup.object({
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters include uppercase letter, number and special character.")
    .required("New password is required."),
});

const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    // .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm new password is required."),
});



const yupSync = (schema) => ({
  validator: async (_, value) => {
    try {
      await schema.validateSyncAt(_.field, { [_.field]: value });
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },
});



const ForgotPasswordForm = () => {
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (values) => {
    try {
      console.log("Reset password for:", values.email);
      await new Promise((resolve) => setTimeout(resolve, 300));
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
      await new Promise((resolve) => setTimeout(resolve, 300));
      message.success("Your password has been successfully changed.");
      navigate("/reset-password-success");
    } catch (error) {
      message.error(error.message || "Failed to process request. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-evenly mt-10">
        <div className="w-full sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[600px] xl:w-[658px] xl:h-[697px] bg-white p-[40px] rounded-lg shadow-lg">
        <Link to="/login" className="mb-2 text-[#111928] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold flex items-center self-start no-underline hover:no-underline">
              <LeftOutlined className="mr-2" /> Back to Login
            </Link>
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
                rules={[yupSync(emailSchema)]}>
                <Input className="h-[40px]" placeholder="Enter your email here" suffix={<MailOutlined style={{ color: '#6B7280' }} />} />
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
                  rules={[yupSync(passwordSchema)]}
                >
                  <Input.Password className="h-[40px]" placeholder="********" iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} 
                        onCopy={(e) => e.preventDefault()} // Ngăn sao chép mật khẩu
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Confirm new password <span className="ml-1 text-red-500">*</span>
                    </>
                  }
                  name="confirmPassword"
                  required={false}
                  dependencies={["password"]}
                   rules={[yupSync(confirmPasswordSchema)]}
                >
                  <Input.Password className="h-[40px]" placeholder="********" iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} 
                      onCopy={(e) => e.preventDefault()} // Ngăn sao chép mật khẩu
                  />
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