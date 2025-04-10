import { Form, Input, Button, Card, Row, Col, Typography, Layout } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, MailOutlined } from "@ant-design/icons";
import { ForgotPasswordImg } from "@assets/images";
import { emailSchema } from "./schema";
import { useForgotPassword } from "@features/auth/hooks";
import toast, { Toaster } from 'react-hot-toast';

const { Title, Text } = Typography;
const { Content } = Layout;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPasswordFunc, isPending } = useForgotPassword();
  
  const onFinish = (values) => {
    forgotPasswordFunc(
      { ...values, host: window.location.origin },
      {
        onSuccess: () => {
          toast.success("Password reset email sent successfully!");
        },
      }
    );
  };

  return (
    <Layout className="bg-[#f9f9f9]">
      <Toaster />
      <Layout.Content className="max-w-[1200px] mx-auto w-full">
        <Row gutter={0} className="h-full">
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            className="flex items-center justify-center p-4"
          >
            <Card
              className="w-full max-w-xl shadow-lg p-4 sm:p-8 min-h-[600px]"
            >
              <div
                className="mb-6 flex items-center cursor-pointer gap-2"
                onClick={() => navigate("/login")}
              >
                <LeftOutlined />
                <Text
                  className="font-semibold text-base sm:text-[16px] text-[#374151]"
                >
                  Back to login
                </Text>
              </div>

              <div className="mb-6 w-full">
                <Title
                  level={2}
                  className="font-bold text-4xl lg:text-5xl text-[#111928] mb-2 text-center sm:text-left"
                >
                  Forgot password?
                </Title>
                <div className="w-full">
                  <Text
                    className="font-normal text-base text-[#637381] block text-center sm:text-left"
                  >
                    Don't worry! Enter your email below to recover your password
                  </Text>
                </div>
              </div>

              <Form layout="vertical" onFinish={onFinish} className="w-full">
                <div className="grid grid-cols-1 gap-4 w-full">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[yupSync(emailSchema)]}
                    required
                    className="w-full"
                  >
                    <Input
                      suffix={<MailOutlined className="text-[#dadcdf]" />}
                      placeholder="Enter your email here"
                      size="large"
                      className="w-full"
                    />
                  </Form.Item>
                </div>
                <Form.Item className="mt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full max-w-[250px] h-[50px] rounded-full px-7 py-3 bg-[#003087] mx-auto flex items-center justify-center"
                    loading={isPending}
                  >
                    Reset password
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
                alt="ForgotPassword"
                className="max-w-full h-auto"
              />
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ForgotPassword;
