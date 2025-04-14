import { useClassDetailQuery } from "@features/classDetail/hooks/useClassDetail";
import ClassInfo from "@features/classDetail/ui/ClassInfo/ClassInfo";

import SessionManager from "@features/classDetail/ui/SessionManager/SessionManager";
import { Divider, Spin } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const { classId } = useParams();
  const {
    data: classDetail,
    isLoading,
    isError,
  } = useClassDetailQuery(classId);

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
    <div className="p-8">
      <ClassInfo data={classDetail} />
      <Divider />
      <SessionManager data={classDetail} />
    </div>
  );
};

export default ClassDetail;
