// Define public routes accessible to all users
import { PublicLayout } from "@app/layout/PublicLayout";
import ForgotPassword from "@pages/ForgotPassword/index";
import LoginPage from "@pages/Login/index";
import ResetPassword from "@pages/ResetPassword/index";
import ResetPasswordSuccess from "@pages/ResetPassword/ResetSuccess";
import GradingPage from "@pages/Grading/GradingPage";

const PublicRoute = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "reset-success",
        element: <ResetPasswordSuccess />,
      },
      {
        path: "session/:sessionId/participant/:participantId",
        element: <GradingPage />,
      },
    ],
  },
];

export default PublicRoute;
