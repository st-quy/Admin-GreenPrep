
import React from "react";
import { useNavigate } from "react-router-dom";
import RSPassword from "@assets/images/RS-password.png";


const ResetPasswordSuccessfullyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen !bg-white">
      <div className="text-center max-w-[624px] w-full px-4 mx-auto">
        <img 
          src={RSPassword}
          alt="Reset Password Successfully"
          className="w-full max-w-[624px] h-[416px] object-contain mx-auto mb-8 sm:mb-10"
        />
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Reset password successfully.
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          Your password has been successfully reset. Please log in again.
        </p>
        <div className="flex justify-center">
          <button
            className="reset-password-button w-[250px] h-[50px] rounded-[50px] bg-[#4255FF] text-white hover:bg-[#3445E5] transition-colors text-sm sm:text-base outline-none focus:outline-none border-none"
            onClick={() => navigate("/")}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccessfullyPage; 