import { Form, Input, Button, Card, Row, Col, Typography, message } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ForgotPasswordImg } from "@assets/images";
import { useResetPassword } from "@features/auth/hooks";
import { ResetPasswordSchema } from "./schema";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPasswordFunc, isPending } = useResetPassword();
  const [searchParams, setSearchParams] = useSearchParams();

  const onFinish = (values) => {
    if (searchParams.get("token")) {
      resetPasswordFunc({
        token: searchParams.get("token"),
        newPassword: values.password,
      });
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      message.error("Token not found, please try again");
      navigate("/login");
    }

    const tokenExpiration = jwtDecode(token)?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenExpired = tokenExpiration < currentTime;

    if (!token || isTokenExpired) {
      message.error("Token expired, please try again");
      navigate("/login");
    }
  }, [searchParams.get("token"), navigate]);
  return (
    <Row className=" bg-[#f3f4f6]">
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        className="flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-xl shadow-lg p-4 sm:p-8">
          <div className="mb-6">
            <Title
              level={2}
              className="!text-gray-900 !mb-2 text-center sm:text-left"
            >
              Create new password
            </Title>
            <Text className="text-gray-500 block text-center sm:text-left">
              Your previous password has been reseted. Please set a new password
              for your account.
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 ">
              <Form.Item
                name="password"
                label="Password"
                required
                rules={[yupSync(ResetPasswordSchema)]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item
                name="passwordConfirmation"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Password confirmation is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords must match"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm password" size="large" />
              </Form.Item>
            </div>
            <Form.Item className="mt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-[#003087] hover:bg-blue-800 rounded-full"
                loading={isPending}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col
        xs={{ span: 0 }}
        md={{ span: 12 }}
        className="flex items-center justify-center"
      >
        <div className="text-center p-4">
          <img
            src={ForgotPasswordImg}
            alt="ResetPassword"
            className="max-w-full h-auto"
          />
        </div>
      </Col>
    </Row>
  );
};
export default ResetPassword;
