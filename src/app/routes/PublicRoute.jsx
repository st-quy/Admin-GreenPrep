// Define public routes accessible to all users
import { PublicLayout } from "@app/layout/PublicLayout";
import ResetPassword from "@pages/ResetPassword";
import ResetSuccess from "@pages/ResetPassword/ResetSuccess";

const PublicRoute = [
  {
    path:"/",
    element:<PublicLayout />,
    children: [
     
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "reset-success",
        element: <ResetSuccess />,  
      },
    ]
  }
]



export default PublicRoute;
