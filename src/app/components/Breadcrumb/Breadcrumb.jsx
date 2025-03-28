import { Breadcrumb as AntBreadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = ({ paths }) => {
  const breadcrumbItems = paths
    .filter((path) => path.name) // Filter out empty names
    .map((path, index) => ({
      title: path.link ? (
        <Link to={path.link}>{path.name}</Link>
      ) : (
        <span>{path.name}</span>
      ),
      key: index,
    }));

  return (
    <AntBreadcrumb
      separator=">"
      className="p-6 bg-white my-8 rounded-xl border border-slate-300 border-solid"
      items={breadcrumbItems}
    />
  );
};
