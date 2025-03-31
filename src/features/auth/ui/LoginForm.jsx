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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20 py-8">
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-center gap-x-8">
        {/* Form Section - Left Side */}
        <div className="w-full sm:w-[450px] md:w-[500px] lg:w-[550px] h-auto p-6 sm:p-8 md:p-12 lg:p-20 bg-white rounded-2xl shadow-xl -mt-24 md:-mt-32 lg:-mt-36">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111928]">Welcome back!</h2>
          <p className="text-[#637381] text-sm md:text-base lg:text-lg mt-3 mb-6">Welcome back! Please enter your details.</p>
          {errorMessage && <p className="text-red-500 text-base text-center mb-4">{errorMessage}</p>}
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className="mt-6"
          >
            <Form.Item
              name="email"
              label={<span className="text-base md:text-lg">Email <span className="text-red-500">*</span></span>}
              rules={[yupSync(loginSchema)]}
            >
              <Input
                suffix={<img src={mail} alt="Mail icon" className="w-5 h-5" />}
                placeholder="Enter your email here"
                className="rounded-lg placeholder:text-[#9CA3AF] text-base h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-base md:text-lg">Password <span className="text-red-500">*</span></span>}
              rules={[yupSync(loginSchema)]}
            >
              <Input.Password
                placeholder="* * * * * * * *"
                iconRender={(visible) => (
                  visible ? <EyeOutlined className="text-lg" /> : <EyeInvisibleOutlined className="text-lg" />
                )}
                className="rounded-lg placeholder:text-[#9CA3AF] text-base h-12"
              />
            </Form.Item>

            <div className="mt-2 text-right">
              <Link to="" className="text-[#003087] text-sm md:text-base no-underline hover:underline">Forgot password?</Link>
            </div>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="mt-6 bg-[#003087] text-white w-[200px] h-[48px] border-hidden rounded-full hover:bg-blue-600 text-base md:text-lg"
              >
                Login
              </Button>
            </div>
          </Form>
        </div>

        {/* Image Section - Right Side */}
        <div className="w-[80%] sm:w-[60%] md:w-[45%] lg:w-[50%] flex items-center justify-center p-4 sm:p-6 md:p-8 mt-8 md:mt-0">
          <img src={loginHappyStudent} alt="Happy students celebrating" className="max-w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
