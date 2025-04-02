import "antd/dist/reset.css";
import { QuestionAnswer } from "./QuestionAnswer";
import ScoreCommentForm from "./ScoreCommentForm";
import { Card, Tabs, Button } from "antd";
import "./index.css";
import { useState, useEffect } from "react";

export const Assessment = ({ isSpeaking, data }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [totalScore, setTotalScore] = useState(100);
  const [partData, setPartData] = useState({});

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    setActiveTab("1");
    handleDataChange();
  }, [isSpeaking]);
  useEffect(() => {
    handleDataChange();
  }, [activeTab]);

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
      console.error("Error parsing speaking data:", error);
    }
  };

  const handleSaveAsDraft = () => {
    // Future functionality: Save score as draft to database
    console.log("Saving score as draft:", totalScore);
  };

  const handleSubmitScore = () => {
    // Future functionality: Submit final score to database
    console.log("Submitting final score:", totalScore);
  };

  const handleDisplayPart = () => {
    if (!partData) return "";
    if (isSpeaking && activeTab == "4") {
      const partFourQuestions = partData.Questions || [];
      return <div className="flex gap-10 relative" >
        <div className="w-[80%] h-fit shadow-md rounded-lg">
          <QuestionAnswer isSpeaking={isSpeaking} fileName="LoL" speakingPartFour={partFourQuestions} currentPart={activeTab} currentQuestionIndex={0} />
        </div>
        <div className="w-[20%] h-[15.9375rem] shadow-md sticky top-0 rounded-lg">
          <ScoreCommentForm />
        </div>
      </div >
    }
    return partData.Questions?.map((question, index) =>
    (
      <div className="flex gap-10 relative" key={index}>
        <div className="w-[80%] h-fit shadow-md rounded-lg">
          <QuestionAnswer isSpeaking={isSpeaking} fileName="haha" quesntionsAnswerData={question} currentPart={activeTab} currentQuestionIndex={index} />
        </div>
        <div className="w-[20%] h-[15.9375rem] shadow-md sticky top-0 rounded-lg">
          <ScoreCommentForm />
        </div>
      </div>
    ));

  }

  return (
    <div className="w-full">
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
                <div className="flex items-center leading-6">
                  <div className="flex text-base items-center">
                    Total Score:{" "}
                    <span className="text-2xl font-semibold text-[#003087] pl-[30px] pr-[50px]">
                      {totalScore}
                    </span>
                  </div>
                  <div className="flex">
                    <Button
                      onClick={handleSaveAsDraft}
                      className="h-auto px-[28px] py-[13px]  text-base text-[#003087] border border-[#003087] rounded-[50px] mr-[12px]"
                    >
                      Save as draft
                    </Button>
                    <Button
                      onClick={handleSubmitScore}
                      type="primary"
                      className="h-auto px-[28px] py-[13px] text-base bg-[#003087] rounded-[50px]"
                    >
                      Submit score
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!isSpeaking && partData && <Card
          variant="borderless"
          className="rounded-lg overflow-hidden w-[78%] px-[43px] py-[41px]"
          styles={{ body: { padding: 0 } }}
        >
          <div>{partData.Content || ""}</div>
          <div className="text-gray-500 font-bold">{partData.SubContent || ""}</div>
        </Card>}
        {handleDisplayPart()}
      </div>
    </div>
  );
};
