import React from "react";
import SessionTable from "./SessionTable/SessionTable";
import ActionModal from "../SessionModal/ActionModal/ActionModal";

const SessionManager = ({ data }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center pt-8">
        <div>
          <h4 className="text-[26px] font-[600]">Sessions list</h4>
          <p className="text-[#637381]">Overview of Active and Past Sessions</p>
        </div>
        <ActionModal isEdit={false} onSubmit={""} />
      </div>
      <div className="mt-8">
        <SessionTable dataSource={data} />
      </div>
    </>
  );
};

export default SessionManager;
