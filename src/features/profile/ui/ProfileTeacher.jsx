// @ts-nocheck
import React from 'react';
import ButtonProfile from './components/ButtonProfile';
import ProfileUpdate from './components/ProfileUpdate';
import ChangePassword from './components/ChangePassword';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserFromToken, QUERY_KEYS } from '../api';

const ProfileTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: getUserFromToken,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        queryClient={queryClient}
      />

      <ChangePassword 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

export default ProfileTeacher; 