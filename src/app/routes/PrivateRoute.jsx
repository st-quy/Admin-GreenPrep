import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SessionLayout from "../../pages/SessionManagement/SessionLayout.jsx";
import SessionInformation from "@pages/SessionManagement/SessionInformation.jsx";
import { TableType } from "@features/session/constant/TableEnum.js";
const ProfilePage = lazy(() => import("@pages/Profile/index.jsx"));
import Dashboard from "@pages/Dashboard/Dashboard.jsx";
import ClassDetail from "@pages/ClassDetail/ClassDetail.jsx";
import ClassManagement from "@pages/ClassManagement/index.jsx";
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
            path: ":classId",
            breadcrumb: "Class Detail",
            children: [
              {
                index: true,
                element: <ClassDetail />,
              },
              {
                path: "session",
                element: <SessionLayout />,
                children: [
                  {
                    path: ":sessionId",
                    breadcrumb: "Session Detail",
                    children: [
                      {
                        index: true,
                        element: (
                          <SessionInformation type={TableType.SESSION} />
                        ),
                      },
                      {
                        path: "student",
                        children: [
                          {
                            path: ":studentId",
                            breadcrumb: "Student Detail",
                            children: [
                              {
                                index: true,
                                element: (
                                  <SessionInformation
                                    type={TableType.STUDENT}
                                  />
                                ),
                              },
                            ],
                          },
                        ],
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
