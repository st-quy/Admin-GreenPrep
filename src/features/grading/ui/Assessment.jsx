import { QuestionAnswer } from "./QuestionAnswer";
import React, { useState } from "react";
import { Tabs, Button } from "antd";
import "antd/dist/reset.css";
import ScoreTabs from "./Navigation";
import AssessmentComponent from "./assessmentScores";
export const Assessment = () => {
  return (
    <div className="w-full">
      <div className="py-[2.3125rem]">
        <ScoreTabs />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-10 relative">
          {/* map data here */}
          <div className="w-[70%] h-fit shadow-md">
            <QuestionAnswer isSpeaking={true} fileName={"test"} />
          </div>
          <div className="w-[20.375rem] h-[15.9375rem] shadow-md sticky top-0">
            {/* put component of score here */}
          </div>
        </div>
      </div>
    </div>
  );
};
