import ResetPasswordSuccessfullyPage from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyPage.jsx";
import ResetPasswordSuccessfullyLayout from "@pages/ResetPasswordSuccessfully/ResetPasswordSuccessfullyLayout.jsx";

import { PublicLayout } from "@app/layout/PublicLayout";


const PublicRoute = [
  {
    path:"/",
    element:<PublicLayout />,
    children: [{
      path: "login",
      element: "login",
    }]
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
