// Define public routes accessible to all users

import { Assessment } from "@features/grading/Assessment";

const PublicRoute = [
  {
    path: "login",
    element: "login",
  },
  {
    path: "testing",
    element: <Assessment/>,
  },
];

export default PublicRoute;
