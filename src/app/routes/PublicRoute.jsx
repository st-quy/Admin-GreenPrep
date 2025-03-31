// Define public routes accessible to all users

import { PublicLayout } from "@app/layout/PublicLayout";
import LoginPage from "../../features/auth/ui/LoginForm";


const PublicRoute = [
  // {
    // path:"/",
    // element:"",
    // children: [
      {
      path: "login",
      element: <LoginPage />,
    }]
  },
];

            path: "login",
             element: "login",
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordForm/>,
          },   
        ],}
      ]