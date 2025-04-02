// @ts-nocheck

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { ForgotPw } from "@assets/images";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthApi } from "../api";
import { emailSchema } from "../schemas/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();
  const resetToken = searchParams.get("token");

  useEffect(() => {
    if (location.pathname === "/reset-password") {
      if (!resetToken) {
        message.error("Invalid or missing reset token");
        navigate("/forgot-password");
        return;
      }
      setIsReset(true);
    }
  }, [resetToken, location.pathname, navigate]);

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => AuthApi.forgotPassword(email),
    onSuccess: (response) => {
      message.success(
        response.message || "Password reset link sent to your email"
      );
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => AuthApi.resetPassword(data.token, data.password),
    onSuccess: () => {
      navigate("/reset-password-success");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    },
  });

  const handleEmailSubmit = (values) => {
    forgotPasswordMutation.mutate(values.email);
  };

  const handlePasswordSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (!resetToken) {
      message.error("Reset token is missing");
      return;
    }

    resetPasswordMutation.mutate({
      token: resetToken,
      password: values.password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-center gap-8 -mt-40">
        <div className="w-full sm:w-[400px] sm:h-[450px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[600px] xl:w-[658px] xl:h-[697px] bg-white p-[40px] pt-[60px] rounded-lg shadow-lg">
          {!isReset && (
            <Link
              to="/login"
              className="mb-4 text-[#111928] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold flex items-center self-start no-underline hover:no-underline"
            >
              <span className="mr-2">&lt;</span> Back to Login
            </Link>
          )}
          <h2 className="text-[28px] md:text-[30px] lg:text-[42px] xl:text-[45px] font-bold text-[#111928] mb-4 leading-tight">
            {isReset ? "Create new password" : "Forgot password?"}
          </h2>
          <p className="text-gray-600 text-sm mb-6 md:text-[12.5px] lg:text-[18px] xl:text-[20px]">
            {isReset
              ? "Your previous password has been reset. Please set a new password for your account."
              : "Don't worry! Enter your email below to recover your password"}
          </p>
          <Form
            form={form}
            onFinish={isReset ? handlePasswordSubmit : handleEmailSubmit}
            layout="vertical"
            className="space-y-6"
          >
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
                  {
                    validator: async (_, value) => {
                      try {
                        await emailSchema.validate({ email: value });
                      } catch (err) {
                        throw new Error(err.message);
                      }
                    },
                  },
                ]}
              >
                <Input
                  className="h-[40px]"
                  placeholder="Enter your email here"
                />
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
                  validateTrigger={["onChange", "onBlur"]}
                  help={
                    form.getFieldValue("password") ? (
                      <ul className="list-none pl-0 mt-1 text-sm space-y-1">
                        <li
                          className={
                            form.getFieldValue("password")?.length >= 8
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          • At least 8 characters
                        </li>
                        <li
                          className={
                            /[A-Z]/.test(form.getFieldValue("password"))
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          • One uppercase letter
                        </li>
                        <li
                          className={
                            /[a-z]/.test(form.getFieldValue("password"))
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          • One lowercase letter
                        </li>
                        <li
                          className={
                            /[0-9]/.test(form.getFieldValue("password"))
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          • One number
                        </li>
                        <li
                          className={
                            /[@$!%*?&]/.test(form.getFieldValue("password"))
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          • One special character (@$!%*?&)
                        </li>
                      </ul>
                    ) : null
                  }
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          throw new Error("New password is required");
                        }

                        const errors = [];

                        if (value.length < 8) {
                          errors.push("Password must be at least 8 characters");
                        }
                        if (!/[A-Z]/.test(value)) {
                          errors.push(
                            "Password must contain at least one uppercase letter"
                          );
                        }
                        if (!/[a-z]/.test(value)) {
                          errors.push(
                            "Password must contain at least one lowercase letter"
                          );
                        }
                        if (!/[0-9]/.test(value)) {
                          errors.push(
                            "Password must contain at least one number"
                          );
                        }
                        if (!/[@$!%*?&]/.test(value)) {
                          errors.push(
                            "Password must contain at least one special character (@$!%*?&)"
                          );
                        }

                        if (errors.length > 0) {
                          throw new Error(errors.join(", "));
                        }
                      },
                    },
                  ]}
                >
                  <Input.Password
                    className="h-[40px]"
                    placeholder="********"
                    onChange={() => {
                      form.validateFields(["confirmPassword"]);
                      form.setFieldValue(
                        "password",
                        form.getFieldValue("password")
                      );
                    }}
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    onCopy={(e) => e.preventDefault()}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Confirm new password{" "}
                      <span className="ml-1 text-red-500">*</span>
                    </>
                  }
                  name="confirmPassword"
                  required={false}
                  dependencies={["password"]}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value) {
                          throw new Error("Please confirm your new password");
                        }
                        const password = form.getFieldValue("password");
                        if (value !== password) {
                          throw new Error("The two passwords do not match");
                        }
                      },
                    },
                  ]}
                >
                  <Input.Password
                    className="h-[40px]"
                    placeholder="********"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    onCopy={(e) => e.preventDefault()}
                  />
                </Form.Item>
              </>
            )}
            <div className="flex justify-center w-full">
              <Button
                type="primary"
                htmlType="submit"
                loading={
                  forgotPasswordMutation.isPending ||
                  resetPasswordMutation.isPending
                }
                className="w-[250px] h-[50px] bg-[#3758F9] text-white rounded-[50px] mt-4 flex justify-center items-center"
              >
                {isReset ? "Submit" : "Reset password"}
              </Button>
            </div>
          </Form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img
            src={ForgotPw}
            alt="Forgot Password Illustration"
            className="w-full max-w-[650px] h-auto sm:w-[400px] md:w-[500px] lg:w-[650px] xl:w-[661px] xl:h-[697px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
