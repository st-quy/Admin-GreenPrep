import { PublicLayout } from "@app/layout/PublicLayout";
import ForgotPasswordForm from "@features/auth/ui/ForgotPasswordForm";
    
    const PublicRoute = [
      {
        path:"/",
        element:<PublicLayout />,
        children: [
          {

            path: "login",
             element: "login",
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordForm/>,
          },   
        ],}
      ]