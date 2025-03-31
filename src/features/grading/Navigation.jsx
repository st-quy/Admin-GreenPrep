import { useState } from "react"
import { Tabs, Button} from "antd"
import "./index.css";
export default function ScoreTabs() {
  const [activeTab, setActiveTab] = useState("1")
  const [totalScore, setTotalScore] = useState(100)

  const handleTabChange = (key) => {
    setActiveTab(key)
    // In the future, this would fetch questions for the selected part from API
  }

  const handleSaveAsDraft = () => {
    // Future functionality: Save score as draft to database
    console.log("Saving score as draft:", totalScore)
  }

  const handleSubmitScore = () => {
    // Future functionality: Submit final score to database
    console.log("Submitting final score:", totalScore)
  }

  return (
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
                paddingLeft: "25px", 
                paddingRight: "25px", 
                borderRadius: "8px", 
                borderBottom:"1px solid #DFE4EA", 
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)"
            }} 
            />
            <div className="flex items-center gap-4">
              <div className="text-base font-bold">
                Total Score: <span className="text-2xl font-semibold text-[#003087]">{totalScore}</span>
                {/* pl-[30px] pr-[50px]  */}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveAsDraft}
                //   className="px-4 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                className="w-[157px] h-[50px] text-base text-[#003087] border border-[#003087] rounded-[50px] mr-[12px]"
                >
                  Save as draft
                </Button>
                <Button
                  onClick={handleSubmitScore}
                  type="primary"
                  className="w-[157px] h-[50px] text-base bg-[#003087] rounded-[50px]"
                >
                  Submit score
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          {/* Content area for questions - will be populated from API in the future */}
          {activeTab === "1" && <div>Questions for Part 1 will be displayed here</div>}
          {activeTab === "2" && <div>Questions for Part 2 will be displayed here</div>}
          {activeTab === "3" && <div>Questions for Part 3 will be displayed here</div>}
          {activeTab === "4" && <div>Questions for Part 4 will be displayed here</div>}
        </div>
      </div>
    </div>
  )
}

