import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "@assets/images/login-happy-student.png";
import { Form, Input, Button, Typography, Alert } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { loginSchema } from "./loginSchema";
import { yupSync } from "@shared/lib/utils";
import { useLogin } from "@features/auth/hooks/index";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: loginFunc, isPending } = useLogin();

  const { isAuth } = useSelector((state) => state.auth);

  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState(false);

  const onSubmit = async (values) => {
    try {
      loginFunc(values);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  return (
    <div className="bg-[#f9f9f9] flex justify-center">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 md:gap-8 lg:gap-12 xl:gap-16 px-8 lg:px-20">
        {/* Login Form */}
        <div
          className="bg-white rounded-lg shadow-[0_12px_34px_0_rgba(13,10,44,0.08)] w-full 
                    min-w-[380px] max-w-[570px] 
                    h-auto min-h-[590px] p-8
                    lg:w-[600px]"
        >
          <div className="h-full flex flex-col">
            <div className="space-y-5 pt-8">
              <div>
                <Title level={1} className="text-xl font-bold text-black m-0">
                  Welcome back!
                </Title>
                <Text className="text-primaryTextColor text-[16px] font-normal">
                  Welcome back! Please enter your details.
                </Text>
              </div>

              {errorMessage && (
                <Alert
                  message={errorMessage}
                  type="error"
                  className="mb-4"
                  showIcon
                />
              )}

              <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                requiredMark={false}
                className="space-y-5 md:max-w-[516px]"
                onValuesChange={() => {
                  form.validateFields(["email"]);
                }}
              >
                <Form.Item
                  name="email"
                  label={
                    <span className="block text-sm font-medium text-black mb-1">
                      Email <span className="text-red-500">*</span>
                    </span>
                  }
                  rules={[yupSync(loginSchema)]}
                  className="mb-4"
                  validateTrigger="onChange"
                >
                  <Input
                    placeholder="Enter your email here"
                    className="max-w-[516px] h-[46px] rounded-lg border-gray-300"
                    onChange={(e) => {
                      form.setFieldsValue({ email: e.target.value });
                      form
                        .validateFields(["email"])
                        .then(() => {
                          setEmailError(false);
                        })
                        .catch(() => {
                          setEmailError(true);
                        });
                    }}
                    suffix={
                      emailError ? (
                        <InfoCircleOutlined
                          style={{ color: "red", pointerEvents: "none" }}
                        />
                      ) : (
                        <MailOutlined className="text-gray-400 border-[#6B7280] border-[0.67px]" />
                      )
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <span className="block text-sm font-medium text-black mb-1">
                      Password <span className="text-red-500">*</span>
                    </span>
                  }
                  rules={[yupSync(loginSchema)]}
                  className="mb-1"
                >
                  <Input.Password
                    placeholder="* * * * * * * *"
                    className="max-w-[516px] h-[46px] rounded-lg"
                    iconRender={(visible) =>
                      form.getFieldError("password")?.length > 0 ? (
                        <InfoCircleOutlined
                          style={{ color: "red", pointerEvents: "none" }}
                        />
                      ) : visible ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )
                    }
                  />
                </Form.Item>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-primaryColor text-sm font-medium no-underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Form>
            </div>

            <div className="mt-4 mb-6">
              <div className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => form.submit()}
                  className="w-[250px] h-[50px] bg-primaryColor hover:bg-blue-800 rounded-full"
                  loading={isPending}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:flex justify-center w-full md:w-auto">
          <img
            src={loginHappyStudent}
            alt="Happy students celebrating"
            className="w-full max-w-[726px] md:max-w-[859px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
