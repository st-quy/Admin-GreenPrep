import React from 'react';
import { Button } from 'antd';

const ButtonProfile = ({ onUpdateProfile, onChangePassword }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:space-x-0">
      <Button
        type="default"
        onClick={onChangePassword}
        className="min-w-[140px] md:min-w-[160px] h-[40px] rounded-full border border-[#0066CC] text-[#0066CC] hover:text-[#0066CC] hover:border-[#0066CC] font-medium"
      >
        Change password
      </Button>
      <Button
        type="primary"
        onClick={onUpdateProfile}
        className="min-w-[140px] md:min-w-[160px] h-[40px] rounded-full bg-[#003087] hover:bg-[#002A6B] border-none font-medium"
      >
        Update profile
      </Button>
    </div>
  );
};

export default ButtonProfile; 