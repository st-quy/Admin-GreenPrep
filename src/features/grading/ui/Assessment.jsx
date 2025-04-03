import "antd/dist/reset.css";
import { QuestionAnswer } from "./QuestionAnswer";
import ScoreCommentForm from "./ScoreCommentForm";
import { Card, Tabs, Button, message } from "antd";
import "./index.css";
import { useState, useEffect } from "react";

export const Assessment = ({ isSpeaking, data }) => {
  const [activeTab, setActiveTab] = useState("1");
  // Track part totals for each skill
  const [totalScore, setTotalScore] = useState({
    speaking: { 1: 0, 2: 0, 3: 0, 4: 0 },
    writing: { 1: 0, 2: 0, 3: 0, 4: 0 },
  });
  const [partData, setPartData] = useState({});
  const [scores, setScores] = useState({ speaking: {}, writing: {} });
  const [messageApi, contextHolder] = message.useMessage();

  const LOCAL_STORAGE_KEY = "assessmentScores";
  const SESSION_STORAGE_KEY = "tempAssessmentScores";
  const TOTAL_SCORE_KEY = "assessmentTotalScores";

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Reset to part 1 when isSpeaking changes
  useEffect(() => {
    setActiveTab("1");
  }, [isSpeaking]);

  useEffect(() => {
    // First try to load from localStorage (saved drafts or submitted scores)
    const savedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedTotalScores = localStorage.getItem(TOTAL_SCORE_KEY);

    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores);
        setScores(parsedScores);

        if (savedTotalScores) {
          const parsedTotalScores = JSON.parse(savedTotalScores);
          // Ensure the structure is complete
          const completeScores = {
            speaking: {
              ...{ 1: 0, 2: 0, 3: 0, 4: 0 },
              ...parsedTotalScores.speaking,
            },
            writing: {
              ...{ 1: 0, 2: 0, 3: 0, 4: 0 },
              ...parsedTotalScores.writing,
            },
          };
          setTotalScore(completeScores);
        } else {
          calculateTotalScore(parsedScores);
        }

        return; // If we found scores in localStorage, use those and don't check sessionStorage
      } catch (error) {
        console.error("Error parsing saved scores from localStorage:", error);
      }
    }

    // If no scores in localStorage, try sessionStorage (temporary scores)
    const tempScores = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (tempScores) {
      try {
        const parsedScores = JSON.parse(tempScores);
        setScores(parsedScores);
        calculateTotalScore(parsedScores);
      } catch (error) {
        console.error("Error parsing saved scores from sessionStorage:", error);
      }
    }

    handleDataChange();
  }, []);

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

  const handleScoreChange = (partNumber, questionIndex, score, comment) => {
    const skillType = isSpeaking ? "speaking" : "writing";
    const updatedScores = { ...scores };

    if (!updatedScores[skillType]) {
      updatedScores[skillType] = {};
    }

    if (!updatedScores[skillType][partNumber]) {
      updatedScores[skillType][partNumber] = {};
    }

    updatedScores[skillType][partNumber][questionIndex] = {
      score: score,
      comment: comment,
    };

    setScores(updatedScores);
    const newTotalScore = calculateTotalScore(updatedScores);

    // Save to sessionStorage immediately when score changes
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedScores));
    sessionStorage.setItem(TOTAL_SCORE_KEY, JSON.stringify(newTotalScore));
  };

  const calculateTotalScore = (scoreData) => {
    const newTotalScore = {
      speaking: { 1: 0, 2: 0, 3: 0, 4: 0 },
      writing: { 1: 0, 2: 0, 3: 0, 4: 0 },
    };

    // Calculate speaking scores by part
    if (scoreData.speaking) {
      Object.keys(scoreData.speaking).forEach((part) => {
        let partTotal = 0;
        Object.keys(scoreData.speaking[part]).forEach((question) => {
          if (scoreData.speaking[part][question].score !== undefined) {
            partTotal +=
              Number.parseInt(scoreData.speaking[part][question].score) || 0;
          }
        });
        newTotalScore.speaking[part] = partTotal;
      });
    }

    // Calculate writing scores by part
    if (scoreData.writing) {
      Object.keys(scoreData.writing).forEach((part) => {
        let partTotal = 0;
        Object.keys(scoreData.writing[part]).forEach((question) => {
          if (scoreData.writing[part][question].score !== undefined) {
            partTotal +=
              Number.parseInt(scoreData.writing[part][question].score) || 0;
          }
        });
        newTotalScore.writing[part] = partTotal;
      });
    }

    setTotalScore(newTotalScore);
    return newTotalScore;
  };

  const handleSaveAsDraft = () => {
    const skillType = isSpeaking ? "speaking" : "writing";
    const currentPart = activeTab;

    // Get the current localStorage data
    let existingScores = { speaking: {}, writing: {} };
    let existingTotalScores = {
      speaking: { 1: 0, 2: 0, 3: 0, 4: 0 },
      writing: { 1: 0, 2: 0, 3: 0, 4: 0 },
    };

    try {
      const savedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedScores) {
        existingScores = JSON.parse(savedScores);
      }

      const savedTotalScores = localStorage.getItem(TOTAL_SCORE_KEY);
      if (savedTotalScores) {
        const parsedTotalScores = JSON.parse(savedTotalScores);
        existingTotalScores = {
          speaking: {
            ...existingTotalScores.speaking,
            ...parsedTotalScores.speaking,
          },
          writing: {
            ...existingTotalScores.writing,
            ...parsedTotalScores.writing,
          },
        };
      }
    } catch (error) {
      console.error("Error parsing existing data:", error);
    }

    // Update only the current part's data
    if (!existingScores[skillType]) {
      existingScores[skillType] = {};
    }

    existingScores[skillType][currentPart] = scores[skillType][currentPart];

    if (!existingTotalScores[skillType]) {
      existingTotalScores[skillType] = { 1: 0, 2: 0, 3: 0, 4: 0 };
    }

    existingTotalScores[skillType][currentPart] =
      totalScore[skillType][currentPart];

    // Save back to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingScores));
    localStorage.setItem(TOTAL_SCORE_KEY, JSON.stringify(existingTotalScores));

    messageApi.success(
      `Part ${currentPart} scores saved as draft successfully`
    );
  };

  const handleSubmitScore = () => {
    const skillType = isSpeaking ? "speaking" : "writing";
    const currentPart = activeTab;

    // Check if all questions in the current part have scores
    let allScoresFilled = true;

    // Special handling for speaking part 4
    if (isSpeaking && currentPart === "4") {
      // For speaking part 4, we only need one score entry
      if (
        !scores[skillType][currentPart] ||
        !scores[skillType][currentPart]["0"] ||
        scores[skillType][currentPart]["0"].score === undefined
      ) {
        allScoresFilled = false;
      }
    } else {
      // For other parts, check all questions
      const currentPartData = partData;

      if (!scores[skillType][currentPart]) {
        allScoresFilled = false;
      } else if (currentPartData && currentPartData.Questions) {
        // Check if all questions in this part have scores
        currentPartData.Questions.forEach((_, questionIndex) => {
          if (
            !scores[skillType][currentPart][questionIndex] ||
            scores[skillType][currentPart][questionIndex].score === undefined
          ) {
            allScoresFilled = false;
          }
        });
      }
    }

    if (!allScoresFilled) {
      messageApi.error(
        `Please fill in all scores for Part ${currentPart} before submitting.`
      );
      return;
    }

    // Get the current localStorage data
    let existingScores = { speaking: {}, writing: {} };
    let existingTotalScores = {
      speaking: { 1: 0, 2: 0, 3: 0, 4: 0 },
      writing: { 1: 0, 2: 0, 3: 0, 4: 0 },
    };

    try {
      const savedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedScores) {
        existingScores = JSON.parse(savedScores);
      }

      const savedTotalScores = localStorage.getItem(TOTAL_SCORE_KEY);
      if (savedTotalScores) {
        const parsedTotalScores = JSON.parse(savedTotalScores);
        existingTotalScores = {
          speaking: {
            ...existingTotalScores.speaking,
            ...parsedTotalScores.speaking,
          },
          writing: {
            ...existingTotalScores.writing,
            ...parsedTotalScores.writing,
          },
        };
      }
    } catch (error) {
      console.error("Error parsing existing data:", error);
    }

    // Update only the current part's data
    if (!existingScores[skillType]) {
      existingScores[skillType] = {};
    }

    existingScores[skillType][currentPart] = scores[skillType][currentPart];

    if (!existingTotalScores[skillType]) {
      existingTotalScores[skillType] = { 1: 0, 2: 0, 3: 0, 4: 0 };
    }

    existingTotalScores[skillType][currentPart] =
      totalScore[skillType][currentPart];

    // Save back to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingScores));
    localStorage.setItem(TOTAL_SCORE_KEY, JSON.stringify(existingTotalScores));

    // Track which parts have been submitted
    const SUBMITTED_PARTS_KEY = "submittedParts";
    let submittedParts = {
      speaking: { 1: false, 2: false, 3: false, 4: false },
      writing: { 1: false, 2: false, 3: false, 4: false },
    };

    try {
      const savedSubmittedParts = localStorage.getItem(SUBMITTED_PARTS_KEY);
      if (savedSubmittedParts) {
        submittedParts = JSON.parse(savedSubmittedParts);
      }
    } catch (error) {
      console.error("Error parsing submitted parts:", error);
    }

    // Mark current part as submitted
    if (!submittedParts[skillType]) {
      submittedParts[skillType] = { 1: false, 2: false, 3: false, 4: false };
    }
    submittedParts[skillType][currentPart] = true;

    // Save updated submitted parts
    localStorage.setItem(SUBMITTED_PARTS_KEY, JSON.stringify(submittedParts));

    messageApi.success(`Part ${currentPart} scores submitted successfully`);
  };

  const getSavedScoreData = (partNumber, questionIndex) => {
    const skillType = isSpeaking ? "speaking" : "writing";
    if (
      scores[skillType] &&
      scores[skillType][partNumber] &&
      scores[skillType][partNumber][questionIndex]
    ) {
      return scores[skillType][partNumber][questionIndex];
    }
    return null;
  };

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
              onScoreChange={handleScoreChange}
              savedData={getSavedScoreData(activeTab, 0)}
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
            onScoreChange={handleScoreChange}
            savedData={getSavedScoreData(activeTab, index)}
            isSpeaking={isSpeaking}
          />
        </div>
      </div>
    ));
  };

  // Get the current part's total score
  const getCurrentPartTotal = () => {
    const skillType = isSpeaking ? "speaking" : "writing";
    // Ensure we have a valid structure before accessing
    if (!totalScore || !totalScore[skillType]) {
      return 0;
    }
    return totalScore[skillType][activeTab] || 0;
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
                <div className="flex items-center leading-6">
                  <div className="flex text-base items-center">
                    Score (Part {activeTab}):{" "}
                    <span className="text-2xl font-semibold text-[#003087] pl-[30px] pr-[50px]">
                      {getCurrentPartTotal()}
                    </span>
                  </div>
                  <div className="flex">
                    <Button
                      onClick={handleSaveAsDraft}
                      className="h-auto px-[28px] py-[13px] text-base text-[#003087] border border-[#003087] rounded-[50px] mr-[12px]"
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
