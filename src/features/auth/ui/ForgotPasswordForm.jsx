// @ts-nocheck

import { EyeInvisibleOutlined, EyeOutlined, MailOutlined } from "@ant-design/icons";
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-50px)] bg-[#f9f9f9] px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-center gap-8 -mt-40">
        <div className="w-full [@media(max-width:599px)]:w-[400px] [@media(max-width:599px)]:h-[430px] sm:w-[400px] sm:h-[440px] md:w-[450px] md:h-[480px] lg:w-[650px] lg:h-[600px] xl:w-[658px] xl:h-[680px] bg-white [@media(max-width:599px)]:p-[30px] [@media(max-width:599px)]:pt-[20px] sm:p-[45px] sm:pt-[30px] md:p-[50px] md:pt-[50px] lg:p-[70px] lg:pt-[60px] rounded-lg shadow-lg">
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
          <p className="text-[#637381] text-sm mb-6 md:text-[12px] lg:text-[16px] ">
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
                     <span style={{ fontSize: '16px' }}>
                    Email <span className="ml-1 text-red-500">*</span></span>
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
                  className="h-[46px] text-[16px] placeholder:text-[16px]"
                  placeholder="Enter your email here"
                  suffix={<MailOutlined style={{ color: '#6B7280' }} />}
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  label={
                    <>
                      <span style={{ fontSize: '16px' }}>
                      New password <span className="ml-1 text-red-500">*</span> 
                      </span>
                    </>
                  }
                  name="password"
                  required={false}                    
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
                            "one uppercase letter"
                          );
                        }
                        if (!/[a-z]/.test(value)) {
                          errors.push(
                            "lowercase letter"
                          );
                        }
                        if (!/[0-9]/.test(value)) {
                          errors.push(
                            "one number"
                          );
                        }
                        if (!/[@$!%*?&]/.test(value)) {
                          errors.push(
                            "and one special character (@$!%*?&)"
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
                    className="h-[46px] text-[16px] placeholder:text-[16px]"
                    placeholder="* * * * * * * *"
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
                      <span style={{ fontSize: '16px' }}> 
                      Confirm new password{" "}
                      <span className="ml-1 text-red-500">*</span></span>
                    </>
                  }
                  name="confirmPassword"
                  required={false}
                  dependencies={["password"]}
                  rules={[
                    {
                      validator: async (_, value) => {
                        const password = form.getFieldValue("password");
                        if (!value) {
                          return Promise.resolve();
                        }

                        if (value !== password) {
                          throw new Error("The two passwords do not match");
                        }
                      },
                    },
                  ]}
                >
                  <Input.Password
                    className="h-[46px] text-[16px] placeholder:text-[16px]"
                    placeholder="* * * * * * * *"
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
                className="w-[250px] h-[50px] bg-[#003087] text-white text-[16px] rounded-[50px] mt-4 flex justify-center items-center"
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
            className="w-full max-w-[650px] h-auto [@media(max-width:599px)]:w-[400px] [@media(max-width:599px)]:h-[430px] sm:w-[350px] md:w-[500px] lg:w-[650px] xl:w-[661px] xl:h-[680px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
