import { sessionsData, classData } from "@features/classDetail/classData";
import ClassInfo from "@features/classDetail/ui/ClassInfo/ClassInfo";
import SessionManager from "@features/classDetail/ui/SessionManager/SessionManager";
import React from "react";

const ClassDetail = () => {
  return (
    <div className="pb-12">
      <ClassInfo data={classData} />
      <SessionManager data={sessionsData} />
    </div>
  );
};

export default ClassDetail;
