import { Form, Input, Button, Card, Row, Col, Typography } from "antd";
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
    <Row className=" bg-[#f3f4f6]">
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        className="flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-xl shadow-lg p-4 sm:p-8">
          <div
            className="mb-6 flex items-center cursor-pointer gap-2"
            onClick={() => navigate("/login")}
          >
            <LeftOutlined />
            <span>Back to login</span>
          </div>
          <div className="mb-6">
            <Title
              level={2}
              className="!text-gray-900 !mb-2 text-center sm:text-left"
            >
              Forgot password?
            </Title>
            <Text className="text-gray-500 block text-center sm:text-left">
              Don’t worry! Enter your email below to recover your password
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 gap-4">
              <Form.Item
                name="email"
                label="Email"
                rules={[yupSync(forgotPasswordSchema)]}
                required
              >
                <Input placeholder="Enter your email here" size="large" />
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
  );
};
export default ForgotPassword;
