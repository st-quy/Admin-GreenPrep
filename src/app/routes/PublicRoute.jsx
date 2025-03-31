import ResetPasswordSuccessfullyPage from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage.jsx";
import { PublicLayout } from "@app/layout/PublicLayout";

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
        path: "reset-password-success",
        element: <ResetPasswordSuccessfullyPage />,
      }
    ]
  }
];

export default PublicRoute;
