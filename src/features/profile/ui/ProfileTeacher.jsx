import React from 'react';
import ButtonProfile from './components/ButtonProfile';
import ProfileUpdate from './components/ProfileUpdate';
import ChangePassword from './components/ChangePassword';
import { useState } from 'react';

const ProfileTeacher = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <ButtonProfile 
        onUpdateProfile={() => setIsModalOpen(true)}
        onChangePassword={() => setIsPasswordModalOpen(true)}
      />
      
      <ProfileUpdate 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
      />

      <ChangePassword 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default ProfileTeacher; 