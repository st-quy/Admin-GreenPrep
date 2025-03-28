import { Logo } from "@assets/images";
import { Layout, Menu } from "antd";
import {
  Outlet,
  useLocation,
  useNavigate,
  matchRoutes,
  useParams,
} from "react-router-dom";
import { StepForwardOutlined } from "@ant-design/icons";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import PrivateRoute from "../PrivateRoute";

const { Header, Content } = Layout;

export const ProtectedRoute = () => {
  const location = useLocation();
  const { id } = useParams();

  const navigate = useNavigate();

  // Generate breadcrumb paths based on route matches
  const routes = matchRoutes(PrivateRoute, location.pathname) || [];
  const breadcrumbPaths = routes.map(({ route }) => ({
    name: route.breadcrumb || "",
    link: route.path
      ? location.pathname.split(route.path)[0] + route.path
      : null,
    param: id,
  }));

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
    <Layout>
      <Header className="flex items-center h-[7rem] bg-white shadow-xl">
        <img src={Logo} className="max-w-44" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0, justifyContent: "center" }}
          items={[
            { key: "1", label: "Dashboard" },
            { key: "2", label: "Class Management" },
            { key: "3", label: "Profile" },
          ]}
          onClick={(e) => navigateTo(e.key)}
        />
        <StepForwardOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </Content>
    </Layout>
  );
};
