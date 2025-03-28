import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import Dashboard from "@pages/Dashboard/Dashboard.jsx";

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    breadcrumb: "Home",
    children: [
      {
        path: "",
        element: <Dashboard />,
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
            path: "session-detail",
            breadcrumb: "Session Detail",
            children: [
              {
                path: "",
                element: <div>Session Detail</div>,
                breadcrumb: "",
              },
              {
                path: "student",
                children: [
                  {
                  path:":id",
                  children: [
                    {
                      path:"",
                      element: <div>Student Detail</div>,
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
