import "antd/dist/reset.css";

import { QuestionAnswer } from "./QuestionAnswer";
import ScoreTabs from "./Navigation";
import ScoreCommentForm from "./ScoreCommentForm";

export const Assessment = () => {
  return (
    <div className="w-full">
      <div className="py-[2.3125rem]">
        <ScoreTabs />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-10 relative">
          {/* map data here */}
          <div className="w-[80%] h-fit shadow-md rounded-lg">
            <QuestionAnswer isSpeaking={true} fileName={"test"} />
          </div>
          <div className="w-[20%] h-[15.9375rem] shadow-md sticky top-0 rounded-lg">
            {/* put component of score here */}
            <ScoreCommentForm />
          </div>
        </div>
      </div>
    </div>
  );
};
