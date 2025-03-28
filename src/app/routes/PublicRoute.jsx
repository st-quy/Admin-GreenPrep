import ResetPasswordSuccessfullyPage from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage.jsx";
import ResetPasswordSuccessfullyLayout from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyLayout.jsx";

const PublicRoute = [
  {
    path: "login",
    element: "login",
  },
  {
    path: "reset-password-success",
    element: <ResetPasswordSuccessfullyLayout />,
    children: [
      {
        path: "",
        element: <ResetPasswordSuccessfullyPage />,
      },
    ],
  },
];

export default PublicRoute;
