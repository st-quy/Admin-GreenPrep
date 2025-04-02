import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import ClassDetail from "@pages/class-detail/ClassDetail.jsx";
const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    breadcrumb: "Home",
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
        breadcrumb: "Dashboard",
      },
      {
        path: "class",
        breadcrumb: "Class Management",
        children: [
          {
            index: true,
            element: <div>Class Management</div>,
          },
          {
            path: "class-detail/:id",
            element: <ClassDetail />,
            breadcrumb: "Class Detail",
          },
          {
            path: "session-detail",
            breadcrumb: "Session Detail",
            children: [
              {
                index: true,
                element: <div>Session Detail</div>,
              },
              {
                path: "student",
                children: [
                  {
                    path: ":studentId",
                    breadcrumb: ":studentId",
                    children: [
                      {
                        index: true,
                        element: <div>Student Detail</div>,
                      },
                      {
                        path: "grade",
                        element: <div>Student Grade</div>,
                        breadcrumb: "Grade",
                      },
                    ],
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
