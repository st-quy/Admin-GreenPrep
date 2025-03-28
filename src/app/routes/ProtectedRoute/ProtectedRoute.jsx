import { Logo } from "@assets/images";
import { Layout, Menu } from "antd";
import {
  Outlet,
  useLocation,
  useNavigate,
  matchRoutes,
  useParams,
} from "react-router-dom";
import { StepForwardOutlined, LogoutOutlined } from "@ant-design/icons";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import PrivateRoute from "../PrivateRoute";

const { Header, Content } = Layout;

export const ProtectedRoute = () => {
  const location = useLocation();
  const { studentId } = useParams();

  const navigate = useNavigate();

  // Generate breadcrumb paths based on route matches
  const routes = matchRoutes(PrivateRoute, location.pathname) || [];

  const breadcrumbPaths = routes.map(({ pathname, params, route }) => {
    let breadcrumb = route.breadcrumb;

    // Replace route parameters with actual values
    if (
      studentId &&
      breadcrumb &&
      breadcrumb.includes(`:${Object.keys(params)[0]}`)
    ) {
      breadcrumb = breadcrumb.replace(`:${Object.keys(params)[0]}`, studentId);
    }

    return {
      name: breadcrumb,
      link: pathname,
      index: route.children
        ? route.children.some((child) => child.index)
        : route.index,
    };
  });

  // Function to handle navigation
  const navigateTo = (key) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/class");
        break;
      case "3":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center h-28 bg-white shadow-xl">
        <img src={Logo} className="max-w-[11rem]" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="flex-1 justify-center "
          items={[
            { key: "1", label: "Dashboard" },
            { key: "2", label: "Class Management" },
            { key: "3", label: "Profile" },
          ]}
          onClick={(e) => navigateTo(e.key)}
        />
        <StepForwardOutlined className="text-2xl cursor-pointer" />
      </Header>
      <Content className="p-10 pt-4">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </Content>
    </Layout>
  );
};
