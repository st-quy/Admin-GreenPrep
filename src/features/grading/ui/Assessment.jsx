import { QuestionAnswer } from "./QuestionAnswer";
export const Assessment = () => {
  return (
    <div className="w-screen h-full px-[6rem]">
      <div className="py-[2.3125rem]">{/* navigation and score */}</div>
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
