import { sessionsData, classData } from "@features/classDetail/classAPI";
import { useClassDetailQuery } from "@features/classDetail/hooks/useClassDetail";
import ClassInfo from "@features/classDetail/ui/ClassInfo/ClassInfo";
import SessionManager from "@features/classDetail/ui/SessionManager/SessionManager";
import React from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const {
    data: classDetail,
    isLoading,
    isError,
  } = useClassDetailQuery("1db40057-623d-4597-b267-520dedd4dc76");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  console.log(classDetail);

  return (
    <div className="pb-12">
      <ClassInfo data={classDetail} />
      <SessionManager data={classDetail} />
    </div>
  );
};

export default ClassDetail;
