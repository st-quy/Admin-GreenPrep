import React, { useState, useRef } from 'react';
import { Button, Typography, Avatar, message, Form } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import defaultAvatar from '@assets/images/avatar.png';
import ProfileTeacher from '@features/profile/ui/ProfileTeacher';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [form] = Form.useForm();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        message.error('Image size should be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        message.error('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result);
       
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  const InfoField = ({ label, value }) => (
    <div>
      <Text className="text-gray-500 text-sm block mb-1">{label}</Text>
      <Text className={value !== 'No information' ? 'text-gray-900 font-semibold' : 'text-gray-500'}>
        {value}
      </Text>
    </div>
  );

  return (
    <div className="p-6 space-y-6 max-w-[1920px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title level={4} className="m-0">My profile</Title>
          <Text className="text-gray-500">Summary of personal information.</Text>
        </div>
        <ProfileTeacher />
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-[114px] h-[122px] relative">
              <img 
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover bg-blue-100 rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <CameraOutlined className="text-white text-xl" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Form.Item name="fullName">
              <Title level={4} className="m-0">{form.getFieldValue('fullName')}</Title>
            </Form.Item>
            <Form.Item name="role">
              <Text className="text-gray-500 font-semibold">{form.getFieldValue('role')}</Text>
            </Form.Item>
            <Form.Item name="email">
              <Text className="block text-gray-500 font-semibold">{form.getFieldValue('email')}</Text>
            </Form.Item>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow-lg border border-gray-100 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
          <div className="space-y-2">
            <Form.Item name="firstName">
              <InfoField label="First Name" value={form.getFieldValue('firstName')} />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item name="lastName">
              <InfoField label="Last Name" value={form.getFieldValue('lastName')} />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item name="email">
              <InfoField label="Email" value={form.getFieldValue('email')} />
            </Form.Item>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 border-t border-gray-100">
          <div className="space-y-2">
            <Form.Item name="bod">
              <InfoField label="BOD" value={form.getFieldValue('bod') || 'No information'} />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item name="phoneNumber">
              <InfoField label="Phone number" value={form.getFieldValue('phoneNumber') || 'No information'} />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item name="address">
              <InfoField label="Address" value={form.getFieldValue('address') || 'No information'} />
            </Form.Item>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow-lg border border-gray-100 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
          <div className="space-y-2">
            <Form.Item name="code">
              <InfoField label="Code" value={form.getFieldValue('code')} />
            </Form.Item>
          </div>
          <div className="space-y-2">
            <Form.Item name="role">
              <InfoField label="Role" value={form.getFieldValue('role')} />
            </Form.Item>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 