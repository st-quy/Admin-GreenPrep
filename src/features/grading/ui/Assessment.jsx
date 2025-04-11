import "antd/dist/reset.css";
import "./index.scss";
import { QuestionAnswer } from "./QuestionAnswer";
import ScoreCommentForm from "./ScoreCommentForm";
import { Card, Tabs, Button, message } from "antd";
import { useState, useEffect } from "react";

const Assessment = ({ isSpeaking, currentUser, data }) => {
  const [activeTab, setActiveTab] = useState("1");
  // Track part totals for each skill
  const [totalScore, setTotalScore] = useState({ speaking: {}, writing: {} });
  const [partData, setPartData] = useState({});
  const [scores, setScores] = useState({ speaking: {}, writing: {} });
  const [messageApi, contextHolder] = message.useMessage();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Reset to part 1 when isSpeaking changes
  useEffect(() => {
    setActiveTab("1");
  }, [isSpeaking, currentUser]);

  useEffect(() => {
    handleDataChange();
  }, [activeTab, isSpeaking]);

  const handleDataChange = () => {
    try {
      const parts = data.data.Parts;
      if (parts && parts.length > 0) {
        const currentPart = `PART ${activeTab}`;
        const currentPartIndex = parts.findIndex((p) =>
          p.Content.toLowerCase().includes(currentPart.toLowerCase())
        );
        setPartData(parts[currentPartIndex]);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  };

  const handleSubmitScore = () => {};
  const handleDisplayPart = () => {
    if (!partData) return "";
    if (isSpeaking && activeTab === "4") {
      const partFourQuestions = partData.Questions || [];
      return (
        <div className="flex gap-10 relative">
          <div className="w-[80%] h-fit shadow-md rounded-lg">
            <QuestionAnswer
              isSpeaking={isSpeaking}
              fileName="LoL"
              speakingPartFour={partFourQuestions}
              currentPart={activeTab}
              currentQuestionIndex={0}
            />
          </div>
          <div className="w-[20%] h-fit shadow-md sticky top-0 rounded-lg">
            <ScoreCommentForm
              partNumber={activeTab}
              questionIndex={0}
              // savedData={}
              isSpeaking={isSpeaking}
            />
          </div>
        </div>
      );
    }

    return partData.Questions?.map((question, index) => (
      <div className="flex gap-10 relative" key={index}>
        <div className="w-[80%] h-fit shadow-md rounded-lg">
          <QuestionAnswer
            isSpeaking={isSpeaking}
            fileName="haha"
            quesntionsAnswerData={question}
            currentPart={activeTab}
            currentQuestionIndex={index}
          />
        </div>
        <div className="w-[20%] h-fit shadow-md sticky top-0 rounded-lg">
          <ScoreCommentForm
            partNumber={activeTab}
            questionIndex={index}
            // savedData={}
            isSpeaking={isSpeaking}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full">
      {contextHolder}
      <div className="py-[2.3125rem]">
        <div className="w-full">
          <div className="flex flex-col">
            <div className="border-b border-gray-200">
              <div className="flex justify-between items-center">
                <Tabs
                  activeKey={activeTab}
                  onChange={handleTabChange}
                  className="w-auto custom-tabs"
                  items={[
                    {
                      key: "1",
                      label: "Part 1",
                    },
                    {
                      key: "2",
                      label: "Part 2",
                    },
                    {
                      key: "3",
                      label: "Part 3",
                    },
                    {
                      key: "4",
                      label: "Part 4",
                    },
                  ]}
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    borderBottom: "1px solid #DFE4EA",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!isSpeaking && partData && (
          <Card
            variant="borderless"
            className="rounded-lg overflow-hidden w-[78%] px-[43px] py-[41px]"
            styles={{ body: { padding: 0 } }}
          >
            <div>{partData.Content || ""}</div>
            <div className="text-gray-500 font-bold">
              {partData.SubContent || ""}
            </div>
          </Card>
        )}
        {!isSpeaking && partData && (
          <Card
            variant="borderless"
            className="rounded-lg overflow-hidden w-[78%] px-[43px] py-[41px]"
            styles={{ body: { padding: 0 } }}
          >
            <div>{partData.Content || ""}</div>
            <div className="text-gray-500 font-bold">
              {partData.SubContent || ""}
            </div>
          </Card>
        )}
        {handleDisplayPart()}
      </div>
    </div>
  );
};

export default Assessment;
