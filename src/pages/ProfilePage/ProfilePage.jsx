// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Button, Typography, Avatar, message, Form } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import defaultAvatar from '@assets/images/avatar.png';
import ProfileTeacher from '@features/profile/ui/ProfileTeacher';
import { getUserFromToken, QUERY_KEYS } from '@features/profile/api';
import { useQuery } from '@tanstack/react-query';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [form] = Form.useForm();

  const { data: userData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: getUserFromToken,
    onError: (error) => {
      console.error('Error fetching user data:', error);
      message.error('Có lỗi khi lấy thông tin người dùng');
    }
  });

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
        {value || 'No information'}
      </Text>
    </div>
  );

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!userData) {
    return <div className="p-6">No user data available</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-[1920px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title level={4} className="m-0">My profile</Title>
          <Text className="text-gray-500">Summary of personal information.</Text>
        </div>
        <ProfileTeacher userData={userData} />
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
            <Title level={4} className="m-0">{userData.firstName} {userData.lastName}</Title>
            <Text className="text-gray-500 font-semibold">{userData.roleIDs?.[0] || 'N/A'}</Text>
            <Text className="block text-gray-500 font-semibold">{userData.email}</Text>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow-lg border border-gray-100 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
          <div className="space-y-2">
            <InfoField label="First Name" value={userData.firstName} />
          </div>
          <div className="space-y-2">
            <InfoField label="Last Name" value={userData.lastName} />
          </div>
          <div className="space-y-2">
            <InfoField label="Email" value={userData.email} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 border-t border-gray-100">
          <div className="space-y-2">
            <InfoField label="BOD" value={userData.bod || 'No information'} />
          </div>
          <div className="space-y-2">
            <InfoField label="Phone number" value={userData.phone || 'No information'} />
          </div>
          <div className="space-y-2">
            <InfoField label="Address" value={userData.address || 'No information'} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow-lg border border-gray-100 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
          <div className="space-y-2">
            <InfoField label="Teacher Code" value={userData.teacherCode || 'No information'} />
          </div>
          
          <div className="space-y-2">
            <InfoField label="Role" value={userData.roleIDs?.[0] || 'No information'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 