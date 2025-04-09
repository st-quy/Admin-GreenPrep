import { Form, Input, Button, Card, Row, Col, Typography, Layout } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { ForgotPasswordImg } from "@assets/images";
import { forgotPasswordSchema } from "./schema";
import { useForgotPassword } from "@features/auth/hooks";

const { Title, Text } = Typography;
const { Content } = Layout;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPasswordFunc, isPending } = useForgotPassword();
  
  const onFinish = (values) => {
    forgotPasswordFunc({ ...values, host: window.location.origin });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <Content style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <Row gutter={0} style={{ height: "100%" }}>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            className="flex items-center justify-center p-4"
          >
            <Card
              className="w-full max-w-xl shadow-lg p-4 sm:p-8"
              style={{ minHeight: "600px" }}
            >
              <div
                className="mb-6 flex items-center cursor-pointer gap-2"
                onClick={() => navigate("/login")}
              >
                <LeftOutlined />
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    color: "#374151",
                  }}
                  className="text-base sm:text-lg"
                >
                  Back to login
                </Text>
              </div>

              <div className="mb-6 w-full">
                <Title
                  level={2}
                  style={{
                    fontWeight: 700,
                    fontSize: "48px",
                    lineHeight: "1.2",
                    letterSpacing: "0px",
                    color: "#111928",
                    marginBottom: "8px",
                  }}
                  className="text-center sm:text-left md:text-4xl lg:text-5xl"
                >
                  Forgot password?
                </Title>
                <div className="w-full">
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "1.5",
                      letterSpacing: "0px",
                      color: "#637381",
                      display: "block",
                    }}
                    className="text-center sm:text-left sm:text-base"
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
                    rules={[yupSync(forgotPasswordSchema)]}
                    required
                    className="w-full"
                  >
                    <Input
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
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      height: "50px",
                      borderRadius: "50px",
                      padding: "13px 28px",
                      background: "#003087",
                      animationDuration: "0ms",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
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
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
