import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SessionLayout from "../../pages/SessionManagement/SessionLayout.jsx";
import SessionInformation from "@pages/SessionManagement/SessionInformation.jsx";
import { TableType } from "@features/session/constraint/TableEnum.js";
import { GradingPage } from "@pages/grading/GradingPage.jsx";
const ProfilePage = lazy(() => import("@pages/ProfilePage/ProfilePage.jsx"));
import ClassManagement from "@pages/ClassManagement/classManagement.jsx";
import Dashboard from "@pages/Dashboard/Dashboard.jsx";
import ClassDetail from "@pages/ClassDetail/ClassDetail.jsx";
import StudentDetail from "@pages/Student/Details/index.jsx";
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
        role: ["admin"],
      },
      {
        path: "class",
        role: ["teacher", "admin"],
        breadcrumb: "Class Management",
        children: [
          {
            index: true,
            element: <ClassManagement />,
          },
          {
            path: ":id",
            element: <ClassDetail />,
            breadcrumb: "Class Detail",
          },
          {
            path: "session",
            element: <SessionLayout />,
            breadcrumb: "Session Detail",
            children: [
              {
                path: ":id",
                element: <SessionInformation type={TableType.SESSION} />,
              },
              {
                path: "student",
                children: [
                  {
                    path: ":id",
                    children: [
                      {
                        index: true,
                        element: <StudentDetail />,
                      },
                      {
                        path: "grade",
                        element: <GradingPage />,
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
