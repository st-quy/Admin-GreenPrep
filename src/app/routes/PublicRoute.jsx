// Define public routes accessible to all users
import {GradingPage} from "@pages/grading/GradingPage";

const PublicRoute = [
  {
    path: "login",
    element: "login",
  },
  {
    path: "testing",
    element: <GradingPage />,
  },
];

export default PublicRoute;
