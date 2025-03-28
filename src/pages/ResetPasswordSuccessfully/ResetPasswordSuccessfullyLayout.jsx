import ResetPasswordHeader from "@features/resetPassword/ui/ResetPasswordHeader";
import { Outlet } from "react-router-dom";

const ResetPasswordSuccessfullyLayout = () => {
  return (
    <div className="!bg-white">
      <ResetPasswordHeader />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ResetPasswordSuccessfullyLayout;