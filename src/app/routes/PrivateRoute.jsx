import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
const ProfilePage = lazy(
  () => import("@pages/ProfilePage/ProfilePage.jsx")
);
import ClassManagement from "@pages/ClassManagement/classManagement.jsx";
import Dashboard from "@pages/Dashboard/Dashboard.jsx";

const PrivateRoute = [
  {
    path: "/",
    element: <ProtectedRoute />,
    breadcrumb: "Home",
    children: [
      {
        index: true,
        element: <Dashboard />,
        breadcrumb: "Dashboard",
      },
      {
        path: "class",
        breadcrumb: "Class Management",
        children: [
          {
            index: true,
            element: <ClassManagement />,
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
        breadcrumb: "Profile",
        children: [
          { 
            path: "", 
            element: <ProfilePage />,
            breadcrumb: "",
         },
        ],
      },
    ],
  },
];

export default PrivateRoute;
