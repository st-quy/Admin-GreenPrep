import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "../../../assets/images/login-happy-student.png";
import mail from "@assets/icons/mail.svg";
import logo from "@assets/images/Logo.png";
import { Form, Input, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { loginSchema } from "../schemas/loginSchema";
import { yupSync } from "@shared/lib/utils/yupSync";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    try {
      // Handle login logic here
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex item-center max-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-evenly">
        {/* Form Section - Left Side */}
        <div className="w-full md:w-[440px] h-auto p-6 md:p-12 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111928]">Welcome back!</h2>
          <p className="text-[#637381] text-xs md:text-sm mt-2 mb-4">Welcome back! Please enter your details.</p>
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className="mt-4"
          >
            <Form.Item
              name="email"
              label={<span>Email <span className="text-red-500">*</span></span>}
              rules={[yupSync(loginSchema)]}
            >
              <Input
                suffix={<img src={mail} alt="Mail icon" className="w-4 h-4" />}
                placeholder="Enter your email here"
                className="rounded placeholder:text-[#9CA3AF] text-sm"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span>Password <span className="text-red-500">*</span></span>}
              rules={[yupSync(loginSchema)]}
            >
              <Input.Password
                placeholder="* * * * * * * *"
                iconRender={(visible) => (
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                )}
                className="rounded placeholder:text-[#9CA3AF] text-sm"
              />
            </Form.Item>

            <div className="mt-1 text-right">
              <Link to="" className="text-[#003087] text-xs no-underline">Forgot password?</Link>
            </div>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="mt-4 bg-[#003087] text-white w-[167px] h-[34px] border-hidden rounded-full hover:bg-blue-600"
              >
                Login
              </Button>
            </div>
          </Form>
        </div>

        {/* Image Section - Right Side */}
        <div className="hidden md:flex w-[40%] items-center justify-center p-8">
          <img src={loginHappyStudent} alt="Happy students celebrating" className="max-w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
