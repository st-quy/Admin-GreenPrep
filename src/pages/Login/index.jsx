import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "@assets/images/login-happy-student.png";
import { Form, Input, Button, Card, Row, Col, Typography, Alert } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
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
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 min-h-screen bg-[#f9f9f9] px-8">
      <div className="flex-1 w-full lg:max-w-[calc(36rem+120px)] flex justify-center items-center pl-[5%]">
        <Card className="bg-white p-10 rounded-2xl shadow-lg h-auto w-full max-w-[658px] flex flex-col justify-between">
          <div className="mt-[30px] w-full">
            <Title level={1} className="text-3xl lg:text-4xl xl:text-5xl font-bold text-black !mb-4">
              Welcome back!
            </Title>
            <Text className="text-[#637381] text-base lg:text-lg mt-4 mb-8 block">
              Welcome back! Please enter your details.
            </Text>

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
              className="mt-4 space-y-4 flex-1 flex flex-col"
            >
              <Form.Item
                name="email"
                label={
                  <span className="text-base lg:text-lg font-medium">
                    Email <span className="text-red-500">*</span>
                  </span>
                }
                required
                rules={[yupSync(loginSchema)]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email here"
                  className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={
                  <span className="text-base lg:text-lg font-medium">
                    Password <span className="text-red-500">*</span>
                  </span>
                }
                required
                rules={[yupSync(loginSchema)]}
              >
                <Input.Password
                  placeholder="* * * * * * * *"
                  className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeOutlined className="text-lg lg:text-xl" />
                    ) : (
                      <EyeInvisibleOutlined className="text-lg lg:text-xl" />
                    )
                  }
                />
              </Form.Item>

              <div className="mt-2 text-right">
                <Link
                  to="/forgot-password"
                  className="text-[#003087] text-base font-medium no-underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Form.Item className="mt-auto flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-[250px] h-[50px] bg-[#003087] hover:bg-blue-800 rounded-full"
                  loading={isPending}
                >
                  Login
                </Button>
              </Form.Item>

              <Text className="text-gray-600 mt-4 block text-center">
                Don't have an account?{" "}
                <span
                  className="text-blue-700 hover:underline cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </Text>
            </Form>
          </div>
        </Card>
      </div>

      <div className="hidden lg:flex items-center justify-center pr-[5%]">
        <img
          src={loginHappyStudent}
          alt="Happy students celebrating"
          className="w-[726px] h-[839px] max-w-full h-auto"
        />
      </div>
    </div>
  );
};
export default LoginPage;
