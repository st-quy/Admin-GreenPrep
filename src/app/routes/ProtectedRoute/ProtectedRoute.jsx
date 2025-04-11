import { Logo } from "@assets/images";
import { ConfigProvider, Layout, Menu, Segmented } from "antd";
import {
  Outlet,
  useLocation,
  useNavigate,
  matchRoutes,
} from "react-router-dom";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import PrivateRoute from "../PrivateRoute";
import { useGetProfile } from "@features/auth/hooks";
import ProfileMenu from "@features/auth/ui/ProfileMenu";
import { useState } from "react";

const { Header, Content } = Layout;

export const ProtectedRoute = () => {
  const [currentKey, setCurrentKey] = useState("1");
  const location = useLocation();

  const navigate = useNavigate();

  // Generate breadcrumb paths based on route matches
  const routes = matchRoutes(PrivateRoute, location.pathname) || [];

  const breadcrumbPaths = routes.map(({ pathname, params, route }) => {
    let breadcrumb = route.breadcrumb;

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
        setCurrentKey(key);
        break;
    }
  };

  const { data, isLoading } = useGetProfile();

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: "#003087",
            itemSelectedColor: "#fff",
            itemColor: "black",
            itemHoverColor: "black",
          },
        },
      }}
    >
      <Layout className="min-h-screen">
        <Header className="flex items-center justify-between h-28 bg-white shadow-xl">
          <div className="w-[200px] flex items-center h-28">
            <img src={Logo} className="max-w-[11rem]" />
          </div>

          <Segmented
            size="large"
            shape="round"
            className="!p-0"
            options={[
              {
                value: "1",
                label: "Dashboard",
              },
              { value: "2", label: "Class Management" },
              ,
            ]}
            onChange={(value) => navigateTo(value)}
          />
          <div className="w-[200px]">
            <ProfileMenu />
          </div>
        </Header>
        <Content className="p-10 pt-4">
          {location.pathname !== "/" && <Breadcrumb paths={breadcrumbPaths} />}
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
