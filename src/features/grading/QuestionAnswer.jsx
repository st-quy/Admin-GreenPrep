import { Card } from "antd";
import AudioPlayers from "./AudioPlayer";

export const QuestionAnswer = ({
  quesntionsAnswerData = {},
  isSpeaking = false,
  fileName = "",
  part = 0,
  speakingPartFour = [],
}) => {
  const studentAnswers = () => {
    if (isSpeaking) {
      return (
        <div className="place-self-center self-center">
          <AudioPlayers
            audioUrl={""} // Replace with the actual audio URL variable
            audioFileName={fileName}
          />
        </div>
      );
    }
    return <p>{/* put the writing answer variable here */}</p>;
  };
  return (
    <Card
      variant="borderless"
      className="rounded-lg overflow-hidden"
      styles={{ body: { padding: 0 } }}
    >
      <div className="bg-[#E6F0FA] px-[4.375rem] py-[2.125rem] leading-6 text-base">
        <div className="flex">
          <div className="font-bold">Question:</div>
          <div>&nbsp;{quesntionsAnswerData?.Content || ""}</div>
        </div>
        {quesntionsAnswerData?.ImageKeys?.length > 0 && (
          <img
            src="https://res.cloudinary.com/dlhcg0tcz/image/upload/v1742958343/greenprep/SpeakingImg/2.png"
            alt="speaking image"
            className="mt-3 w-[35.8125rem]"
          />
        )}
        {speakingPartFour?.length > 0 && (
          <div className="flex flex-col gap-2 py-1">
            {speakingPartFour.map((quest) => (
              <p key={quest.ID}>{quest?.Content || ""}</p>
            ))}
          </div>
        )}
      </div>

      <div className="py-[1.875rem] px-[4.375rem] leading-6 text-base">
        <div className="font-bold mb-2">Student answer</div>
        {studentAnswers()}
      </div>
    </Card>
  );
};
