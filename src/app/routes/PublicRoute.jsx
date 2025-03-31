import ResetPasswordSuccessfullyPage from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage.jsx";
import { PublicLayout } from "@app/layout/PublicLayout";
// Define public routes accessible to all users

// import { PublicLayout } from "@app/layout/PublicLayout";

import ForgotPasswordForm from "@features/auth/ui/ForgotPasswordForm";


const PublicRoute = [
  // {
    // path:"/",
    // element:"",
    // children: [
      {
      path: "login",
      element: "login",
    },
    {
      path: "forgot-password",
      element: <ForgotPasswordForm/>,
    },   
    {
      path: "reset-password-success",
      element: <ResetPasswordSuccessfullyPage/>,
    }
  // ]
  
  // },
  
];

export default PublicRoute;
