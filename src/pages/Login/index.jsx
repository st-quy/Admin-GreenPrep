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
import { useLogin } from "../../features/auth/hooks";
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
    <Row className="bg-[#f3f4f6]">
      <Col xs={24} md={12} className="flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg p-10">
          <div className="mb-6">
            <Title level={2} className="!text-gray-900 !mb-2">
              Welcome back!
            </Title>
            <Text className="text-gray-500">
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

          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              name="email"
              label="Email"
              required
              rules={[yupSync(loginSchema)]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email here"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              required
              rules={[yupSync(loginSchema)]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="rounded-lg"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-blue-700 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-blue-700 hover:bg-blue-800 rounded-full"
                loading={isPending}
              >
                Login
              </Button>
            </Form.Item>

            <Text className="text-gray-600 mt-4 block text-center">
              Don't have an account?{" "}
              <span
                className="text-blue-700 hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </Text>
          </Form>
        </Card>
      </Col>

      <Col xs={0} md={12} className="flex items-center justify-center">
        <img
          src={loginHappyStudent}
          alt="Happy students celebrating"
          className="max-w-[80%] h-auto"
        />
      </Col>
    </Row>
  );
};
export default LoginPage;
