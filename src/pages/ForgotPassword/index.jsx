import { Form, Input, Button, Card, Typography } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { ForgotPasswordImg } from "@assets/images";
import { forgotPasswordSchema } from "./schema";
import { useForgotPassword } from "@features/auth/hooks";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPasswordFunc, isPending } = useForgotPassword();
  
  const onFinish = (values) => {
    forgotPasswordFunc({ ...values, host: window.location.origin });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 min-h-screen bg-[#F9F9F9] px-8">
      <div className="flex-1 w-full lg:max-w-[calc(36rem+120px)] flex justify-center items-center">
        <Card className="bg-white p-10 rounded-2xl shadow-lg h-[701px] w-full max-w-[658px] flex flex-col justify-between">
          <div className="mt-[30px] w-full">
            <div 
              onClick={() => navigate("/login")}
              className="mb-4 text-[#111928] text-sm lg:text-base font-semibold flex items-center cursor-pointer no-underline hover:no-underline"
            >
              <LeftOutlined className="mr-2" />
              Back to Login
            </div>

            <Title level={2} className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111928] !mb-4">
              Forgot password?
            </Title>
            <Text className="text-[#637381] text-base lg:text-lg mt-4 mb-8 block">
              Don't worry! Enter your email below to recover your password.
            </Text>

            <Form 
              layout="vertical" 
              onFinish={onFinish}
              className="mt-4 space-y-4 flex-1 flex flex-col"
            >
              <Form.Item
                name="email"
                label={
                  <span className="text-base lg:text-lg font-medium">
                    Email <span className="text-red-500">*</span>
                  </span>
                }
                required={false}
                rules={[yupSync(forgotPasswordSchema)]}
              >
                <Input 
                  placeholder="Enter your email here" 
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
                  Reset password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <img
          src={ForgotPasswordImg}
          alt="ForgotPassword"
          className="w-[661px] h-[673px] max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
