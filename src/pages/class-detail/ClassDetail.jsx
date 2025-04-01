import { useClassDetailQuery } from "@features/classDetail/hooks/useClassDetail";
import ClassInfo from "@features/classDetail/ui/ClassInfo/ClassInfo";
import FormValidate from "@features/classDetail/ui/FormValidate";
import SessionManager from "@features/classDetail/ui/SessionManager/SessionManager";
import { Spin } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const {
    data: classDetail,
    isLoading,
    isError,
  } = useClassDetailQuery("5dd9f969-1e5c-42b6-9376-eed02e74525e");

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-center text-red-500">Error loading class detail</h1>
      </div>
    );

  return (
    <div className="pb-12">
      <ClassInfo data={classDetail} />
      <SessionManager data={classDetail} />
      {/* <FormValidate /> */}
    </div>
  );
};

export default ClassDetail;
