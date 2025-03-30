import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import * as yup from "yup";

const profileSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  code: yup.string().required("Code is required"),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-phone",
      "Phone number must be 9-10 digits",
      (value) => !value || /^[0-9]{9,10}$/.test(value)
    ),
  bod: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-date",
      "Date of Birth must be in format dd/mm/yyyy",
      (value) =>
        !value ||
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)
    ),
  address: yup.string().nullable().notRequired(),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const ProfileButtons = ({ onChangePassword, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      fullname: userData?.fullName || "",
      email: userData?.email || "",
      code: userData?.code || "",
      phoneNumber:
        userData?.phoneNumber !== "No information" ? userData?.phoneNumber : "",
      bod: userData?.bod !== "No information" ? userData?.bod : "",
      address: userData?.address !== "No information" ? userData?.address : "",
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      await profileSchema.validate(values, { abortEarly: false });
      console.log("Form submitted successfully:", values);
      message.success("Profile updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      console.log("Validation errors:", errors);
      message.error("Please check your input and try again");
    }
  };

  const showPasswordModal = () => {
    passwordForm.resetFields();
    setIsPasswordModalOpen(true);
  };

  const handlePasswordCancel = () => {
    passwordForm.resetFields();
    setIsPasswordModalOpen(false);
  };

  const handlePasswordSubmit = async (values) => {
    try {
      await passwordSchema.validate(values, { abortEarly: false });

      const isCurrentPasswordValid = await verifyCurrentPassword(
        values.currentPassword
      );
      if (!isCurrentPasswordValid) {
        passwordForm.setFields([
          {
            name: "currentPassword",
            errors: ["Incorrect current password"],
          },
        ]);
        return;
      }

      const changePasswordPromise = new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            console.log("Password change submitted:", values);
            resolve();
          } catch (error) {
            reject(new Error("Failed to change password"));
          }
        }, 1000);
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timeout"));
        }, 3000);
      });

      await Promise.race([changePasswordPromise, timeoutPromise]);

      message.success("Password changed successfully");
      setIsPasswordModalOpen(false);
      passwordForm.resetFields();
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        console.log("Validation errors:", errors);
      } else if (err.message === "Request timeout") {
        message.error("Request timed out. Please try again.");
      } else {
        message.error("Failed to change password. Please try again.");
      }
    }
  };

  const verifyCurrentPassword = async (password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:space-x-0">
        <Button
          type="default"
          onClick={showPasswordModal}
          className="min-w-[140px] md:min-w-[160px] h-[40px] rounded-full border border-[#0066CC] text-[#0066CC] hover:text-[#0066CC] hover:border-[#0066CC] font-medium"
        >
          Change password
        </Button>
        <Button
          type="primary"
          onClick={showModal}
          className="min-w-[140px] md:min-w-[160px] h-[40px] rounded-full bg-[#003087] hover:bg-[#002A6B] border-none font-medium"
        >
          Update profile
        </Button>
      </div>

      <Modal
        title={
          <div className="mb-4">
            <h4 className="text-2xl font-bold mb-2">Update profile</h4>
            <p className="text-gray-500">
              Keep your profile up to date by editing your personal information.
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        maskClosable={false}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        >
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Fullname is required" }]}
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Code is required" }]}
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                pattern: /^[0-9]{9,10}$/,
                message: "Phone number must be 9-10 digits",
              },
            ]}
          >
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="bod"
            rules={[
              {
                pattern: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                message: "Date must be in format dd/mm/yyyy",
              },
            ]}
          >
            <Input placeholder="dd/mm/yyyy" className="h-[46px] rounded-lg" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input className="h-[46px] rounded-lg" />
          </Form.Item>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <Button
              onClick={handleCancel}
              className="h-[50px] w-[113px] rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="h-[50px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="mb-4">
            <h4 className="text-xl font-bold mb-2">Change Password</h4>
            <p className="text-gray-500">
              Secure your account with a new password.
            </p>
          </div>
        }
        open={isPasswordModalOpen}
        onCancel={handlePasswordCancel}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <Form
          form={passwordForm}
          onFinish={handlePasswordSubmit}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label={
              <span className="font-medium">
                Current password <span className="text-red-500">*</span>
              </span>
            }
            name="currentPassword"
            rules={[
              { required: true, message: "Current password is required" },
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password
              className="h-[46px] rounded-lg"
              placeholder="Enter your current password"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium">
                New password <span className="text-red-500">*</span>
              </span>
            }
            name="newPassword"
            rules={[
              { required: true, message: "New password is required" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password
              className="h-[46px] rounded-lg"
              placeholder="Enter your new password"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium">
                Confirm new password <span className="text-red-500">*</span>
              </span>
            }
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords must match"));
                },
              }),
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password
              className="h-[46px] rounded-lg"
              placeholder="Confirm your new password"
            />
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={handlePasswordCancel}
              className="h-[46px] w-[113px] rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="h-[46px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ProfileButtons;
