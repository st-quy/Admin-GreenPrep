// Define public routes accessible to all users

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
];

export default PublicRoute;
