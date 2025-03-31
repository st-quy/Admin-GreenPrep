import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SessionLayout from "../../features/auth/ui/SessionLayout.jsx";
import SessionInformation from "@pages/SessionManagement/SessionInformation.jsx";

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    breadcrumb: "Home",
    children: [
      {
        path: "",
        element: <div>Dashboard</div>,
        breadcrumb: "Dashboard",
      },
      {
        path: "class",
        breadcrumb: "Class Management",
        children: [
          {
            path: "",
            element: <div>Class Management</div>,
            breadcrumb: "",
          },
          {
            path: "detail",
            element: <div>Class Detail</div>,
            breadcrumb: "Class Detail",
          },
          {
            path: "session",
            element: <SessionLayout />,
            breadcrumb: "Session Detail",
            children: [
              {
                path: "",
                element: <SessionInformation />,
              },
              {
                path: "student",
                children: [
                  {
                  path:"",
                  children: [
                    {
                      path:"",
                      element: <div>Student infor</div>,
                    },
                    {
                      path:"grade",
                      element: <div>Student Grade</div>,
                    },
                  ]
                },
               ],
                breadcrumb: "Student Detail",
              },
            ],
          },
        ],
      },
      {
        path: "profile",
        element: <div>Profile Page</div>,
        breadcrumb: "Profile",
      },
    ],
  },
];

export default PrivateRoute;