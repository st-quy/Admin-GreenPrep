// @ts-nocheck
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "../../../assets/images/login-happy-student.png";
import mail from "@assets/icons/mail.svg";
import logo from "@assets/images/Logo.png";
import { Form, Input, Button, message, Alert } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { loginSchema } from "../schemas/loginSchema";
import { yupSync } from "@shared/lib/utils/yupSync";
import { AuthApi, AUTH_QUERY_KEYS } from "../api";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const loginMutation = useMutation({
    mutationKey: [AUTH_QUERY_KEYS.USER_LOGIN],
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      message.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error);

      // Display error message based on error type
      if (
        error.message === "Unauthorized: Only teachers can access this platform"
      ) {
        setErrorMessage("Only teacher accounts can access this platform.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Email or password is incorrect. Please try again.");
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Login failed. Please check your information."
        );
      }
    },
  });

  const onSubmit = async (values) => {
    setErrorMessage("");
    loginMutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center w-full justify-center">
        {/* Form Section - Left Side */}
        <div className="w-full sm:w-[450px] md:w-[500px] lg:w-[550px] h-auto p-6 sm:p-8 md:p-12 lg:p-20 bg-white rounded-2xl shadow-xl -mt-24 md:-mt-32 lg:-mt-36">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111928]">
            Welcome back!
          </h2>
          <p className="text-[#637381] text-sm md:text-base lg:text-lg mt-3 mb-6">
            Welcome back! Please enter your details.
          </p>

          {errorMessage && (
            <Alert
              message={errorMessage}
              type="error"
              showIcon
              className="mb-4"
              closable
              onClose={() => setErrorMessage("")}
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className="mt-6"
          >
            <Form.Item
              name="email"
              label={
                <span className="text-base md:text-lg">
                  Email <span className="text-red-500">*</span>
                </span>
              }
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                suffix={<img src={mail} alt="Mail icon" className="w-5 h-5" />}
                placeholder="Enter your email here"
                className="rounded-lg placeholder:text-[#9CA3AF] text-base h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-base md:text-lg">
                  Password <span className="text-red-500">*</span>
                </span>
              }
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                placeholder="* * * * * * * *"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined className="text-lg" />
                  ) : (
                    <EyeInvisibleOutlined className="text-lg" />
                  )
                }
                className="rounded-lg placeholder:text-[#9CA3AF] text-base h-12"
              />
            </Form.Item>

            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-[#003087] text-sm md:text-base no-underline hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loginMutation.isPending}
                className="mt-6 bg-[#003087] text-white w-[200px] h-[48px] border-hidden rounded-full hover:bg-blue-600 text-base md:text-lg"
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </Form>
        </div>

        {/* Image Section - Right Side */}
        <div className="w-[80%] sm:w-[60%] md:w-[45%] lg:w-[50%] flex items-center justify-center p-4 sm:p-6 md:p-8 mt-8 md:mt-0">
          <img
            src={loginHappyStudent}
            alt="Happy students celebrating"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
