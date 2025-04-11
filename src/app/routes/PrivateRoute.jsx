import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import GradingPage from "@pages/Grading/GradingPage";
import SessionLayout from "../../pages/SessionManagement/SessionLayout.jsx";
import SessionInformation from "@pages/SessionManagement/SessionInformation.jsx";
import { TableType } from "@features/session/constant/TableEnum.js";
const ProfilePage = lazy(() => import("@pages/Profile/index.jsx"));
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
                breadcrumb: "Student Detail",
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
                        path: "grade/:participantId",
                        element: <GradingPage />,
                        breadcrumb: "Grade",
                      },
                    ],
                  },
                ],
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
