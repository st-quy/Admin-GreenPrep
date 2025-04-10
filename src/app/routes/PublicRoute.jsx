import ResetPasswordSuccessfullyPage from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage.jsx";
import { PublicLayout } from "@app/layout/PublicLayout";
import ForgotPasswordForm from "@features/auth/ui/ForgotPasswordForm";
import LoginPage from "../../features/auth/ui/LoginForm";
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
        element: <ForgotPasswordForm />,
      },
      {
        path: "reset-password-success",
        element: <ResetPasswordSuccessfullyPage />,
      },
      {
        path: "session/:sessionId/participant/:participantId",
        element: <GradingPage />,
      },
    ],
  },
];

export default PublicRoute;
