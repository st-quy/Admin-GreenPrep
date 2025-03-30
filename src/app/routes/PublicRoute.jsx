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
      element: "reset-password-success",
    }
  // ]
  
  // },
  
];

export default PublicRoute;
