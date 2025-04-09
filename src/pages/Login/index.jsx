import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "@assets/images/login-happy-student.png";
import { Form, Input, Button, Typography, Alert } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, MailOutlined } from "@ant-design/icons";
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
    <div className="min-h-screen bg-[#f9f9f9] flex justify-center items-center">
      <div className="w-full max-w-[1400px] flex justify-center lg:justify-between items-center gap-6 px-6 lg:px-8">
        {/* Login Form */}
        <div 
          className="bg-white rounded-lg shadow-md w-full 
                    max-w-[380px] md:max-w-[450px] lg:max-w-[580px] xl:w-[658px] 
                    h-auto xl:h-[699px] p-8"
          style={{ 
            boxSizing: 'border-box',
            width: '658px', 
            height: '699px',
          }}
        >
          <div className="h-full flex flex-col">
            <div className="space-y-5 pt-8">
              <div>
                <Title level={3} className="text-xl font-bold text-black m-0">Welcome back!</Title>
                <Text className="text-[#637381] text-sm font-normal">Welcome back! Please enter your details.</Text>
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
                className="space-y-5"
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
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="Enter your email here"
                    className="h-10 rounded-lg border-gray-300"
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
                    className="h-10 rounded-lg border-gray-300"
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-[#003087] text-sm font-medium no-underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Form>
            </div>

            <div className="mt-4 mb-10">
              <div className="flex justify-center mb-5">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => form.submit()}
                  className="w-[250px] h-[50px] bg-[#003087] hover:bg-blue-800 rounded-full"
                  loading={isPending}
                >
                  Login
                </Button>
              </div>

              <div className="text-center">
                <Text className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-700 hover:underline cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:block">
          <img
            src={loginHappyStudent}
            alt="Happy students celebrating"
            className="w-auto h-auto max-w-[726px] max-h-[839px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
