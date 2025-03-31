import React from "react";
import SessionTable from "./SessionTable/SessionTable";
import ActionModal from "../SessionModal/ActionModal/ActionModal";

const SessionManager = ({ data }) => {
  return (
    <>
      <div className="flex w-full items-center justify-between pt-8">
        <div>
          <h4 className="font-[700] md:text-[28px] lg:text-[30px]">
            Sessions list
          </h4>
          <p className="text-[#637381] md:text-[16px] lg:text-[18px] font-[500]">
            Overview of Active and Past Sessions
          </p>
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
