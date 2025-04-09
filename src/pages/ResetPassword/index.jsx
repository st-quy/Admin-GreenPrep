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
    <div className="flex item-center min-h-screen bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 w-full lg:max-w-[calc(36rem+120px)]">
            <Card className="bg-white p-10 rounded-2xl shadow-lg h-[600px]">
              <div className="mt-[30px] w-full">
                <Title
                  level={2}
                  className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111928] !mb-4"
                >
                  Create new password
                </Title>
                <Text className="text-[#637381] text-base lg:text-lg mt-4 mb-8 block">
                  Your previous password has been reseted. Please set a new password
                  for your account.
                </Text>

                <Form 
                  layout="vertical" 
                  onFinish={onFinish}
                  className="mt-8 space-y-6 flex-1 flex flex-col"
                >
                  <Form.Item
                    name="password"
                    label={
                      <span className="text-base lg:text-lg font-medium">
                        Password <span className="text-red-500">*</span>
                      </span>
                    }
                    required={false}
                    rules={[yupSync(ResetPasswordSchema)]}
                  >
                    <Input.Password 
                      placeholder="Password" 
                      size="large"
                      className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                    />
                  </Form.Item>

                  <Form.Item
                    name="passwordConfirmation"
                    label={
                      <span className="text-base lg:text-lg font-medium">
                        Confirm Password <span className="text-red-500">*</span>
                      </span>
                    }
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
                    <Input.Password 
                      placeholder="Confirm password" 
                      size="large"
                      className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                    />
                  </Form.Item>

                  <Form.Item className="mt-auto">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="w-full bg-blue-700 hover:bg-blue-800 rounded-full h-12"
                      loading={isPending}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <img
              src={ForgotPasswordImg}
              alt="ResetPassword"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
