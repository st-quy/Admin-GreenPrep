import React, { useState, useRef } from 'react';
import { Button, Typography, Avatar, message } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import defaultAvatar from '@assets/images/avatar.png';
import ProfileButtons from '@features/profile/ui/ProfileTeacher';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(defaultAvatar);


  const userData = {
    firstName: 'Nguyen',
    lastName: 'Thanh Thao',
    fullName: 'Thanh Thao Nguyen',
    email: 'thao.nguyen@gmail.com',
    role: 'Admin',
    code: 'TN09090',
    phoneNumber: 'No information',
    bod: 'No information',
    address: 'No information'
  };

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
        <ProfileButtons 
          userData={userData}
        />
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
            <Title level={4} className="m-0">{userData.fullName}</Title>
            <Text className="text-gray-500 font-semibold">{userData.role}</Text>
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
            <InfoField label="BOD" value={userData.bod} />
          </div>
          <div className="space-y-2">
            <InfoField label="Phone number" value={userData.phoneNumber} />
          </div>
          <div className="space-y-2">
            <InfoField label="Address" value={userData.address} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow-lg border border-gray-100 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8">
          <div className="space-y-2">
            <InfoField label="Code" value={userData.code} />
          </div>
          <div className="space-y-2">
            <InfoField label="Role" value={userData.role} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 