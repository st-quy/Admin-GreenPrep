import "./index.css";
import { useState } from "react";
import { Tabs, Button, Form, InputNumber } from "antd";
import { EditOutlined, AudioOutlined } from "@ant-design/icons";

const AssessmentScores = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("writing");

  const handleTabClick = (key) => {
    setActiveTab(key);
    if (key === "writing") {
      onTabChange(false);
    } else onTabChange(true);
  };

  // Function to determine category based on total score
  const getCategoryFromScore = (score, type) => {
    if (type === "speaking") {
      if (score < 4) return "A1";
      if (score < 16) return "A1";
      if (score < 26) return "A2";
      if (score < 41) return "B1";
      if (score < 48) return "B2";
      return "C";
    } else {
      // writing
      if (score < 6) return "A1";
      if (score < 18) return "A1";
      if (score < 26) return "A2";
      if (score < 40) return "B1";
      if (score < 48) return "B2";
      return "C";
    }
  };

  return (
    <>
      {/* Navigate */}
      <div className="relative">
        <Tabs
          activeKey={activeTab}
          className="custom-tabs-2 mb-[57px]"
          onChange={handleTabClick}
          items={[
            {
              key: "writing",
              label: (
                <>
                  <EditOutlined /> &nbsp; Writing
                </>
              ),
            },
            {
              key: "speaking",
              label: (
                <>
                  <AudioOutlined /> &nbsp; Speaking
                </>
              ),
            },
          ]}
        />
      </div>

      <div className="flex justify-between">
        {/* Title */}
        <div>
          <h2 className="font-bold text-[30px] leading-[38px] text-black mb-[11px]">
            {activeTab === "writing" ? "Writing" : "Speaking"} Assessment Parts
          </h2>
          <p className="font-medium text-[18px] leading-[26px] text-[#637381]">
            Detailed breakdown of each part in the{" "}
            {activeTab === "writing" ? "writing" : "speaking"} assessment.
          </p>
        </div>
        {/* Score Input */}
        <div className="flex items-center leading-6">
          <div className="flex text-base items-center mr-[18px]">
            <Form layout="vertical">
              <Form.Item label="Total Score">
                <InputNumber
                  controls={false}
                  min={0}
                  max={50}
                  className="w-[170px] h-auto border border-[#637381] rounded-[10px]"
                />
              </Form.Item>
            </Form>
          </div>
          <div className="flex">
            <Button
              // onClick={}
              type="primary"
              className="h-auto px-[41.5px] py-[13px] text-base bg-[#003087] rounded-[50px]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentScores;
