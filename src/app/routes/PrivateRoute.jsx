import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute.jsx";
import SessionLayout from "../../features/auth/ui/SessionLayout.jsx";
import SessionInformation from "@pages/SessionManagement/SessionInformation.jsx";
import { TableType } from "@features/session/constraint/TableEnum.js";
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
            path: "detail",
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
                    breadcrumb: ":studentId",
                    children: [
                      {
                        index: true,
                        element: (
                          <SessionInformation type={TableType.STUDENT} />
                        ),
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
