// Define public routes accessible to all users
import {GradingPage} from "@pages/grading/GradingPage";

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
    path: "testing",
    element: <GradingPage />,
  },
];

export default PublicRoute;
