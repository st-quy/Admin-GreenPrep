import { Logo } from "@assets/images";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export const PublicLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center h-[7rem] bg-[#f9f9f9]">
        <img src={Logo} className="max-w-44" />
      </Header>
      <Content className="p-6 flex-1 bg-[#f9f9f9]">
        <Outlet />
      </Content>
    </Layout>
  );
};
