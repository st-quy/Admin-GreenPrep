import React from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useClassDetailQuery } from "@features/classDetail/hooks/useClassDetail";
import ClassInfo from "@features/classDetail/ui/ClassInfo/ClassInfo";
import SessionTable from "@features/classDetail/ui/SessionTable/SessionTable";

const ClassDetail = () => {
  // Extract class ID from URL parameters
  const { id } = useParams();

  // Fetch class details using the custom hook
  const { data: classDetail, isLoading, isError } = useClassDetailQuery(id);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-center text-red-500">Error loading class detail</h1>
      </div>
    );
  }

  // Render class details and session table
  return (
    <div className="pb-12 p-8">
      {/* Class Information Section */}
      <ClassInfo data={classDetail} />

      {/* Session Table Section */}
      <SessionTable data={classDetail.Sessions} />
    </div>
  );
};

export default ClassDetail;
