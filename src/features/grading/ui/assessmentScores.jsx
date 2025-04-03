import { useState, useEffect } from "react";
import { Tabs, Table } from "antd";
import { EditOutlined, AudioOutlined } from "@ant-design/icons";
import "./index.css";

const AssessmentScores = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("writing");
  const [totalScores, setTotalScores] = useState({
    speaking: { 1: 0, 2: 0, 3: 0, 4: 0 },
    writing: { 1: 0, 2: 0, 3: 0, 4: 0 },
  });
  const [submittedParts, setSubmittedParts] = useState({
    speaking: { 1: false, 2: false, 3: false, 4: false },
    writing: { 1: false, 2: false, 3: false, 4: false },
  });

  const TOTAL_SCORE_KEY = "assessmentTotalScores";
  const LOCAL_STORAGE_KEY = "assessmentScores";
  const SUBMITTED_PARTS_KEY = "submittedParts";

  // Load scores and track localStorage changes
  useEffect(() => {
    loadScores();

    // Listen for storage events to update when scores change
    const handleStorageChange = (e) => {
      if (
        e.key === TOTAL_SCORE_KEY ||
        e.key === LOCAL_STORAGE_KEY ||
        e.key === SUBMITTED_PARTS_KEY
      ) {
        loadScores();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Create an interval to check for changes (for same-tab updates)
    const intervalId = setInterval(loadScores, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const loadScores = () => {
    // Load total scores
    const savedTotalScores = localStorage.getItem(TOTAL_SCORE_KEY);
    if (savedTotalScores) {
      try {
        const parsedTotalScores = JSON.parse(savedTotalScores);
        setTotalScores(parsedTotalScores);
      } catch (error) {
        console.error("Error parsing total scores:", error);
      }
    }

    // Load submitted parts information
    const savedSubmittedParts = localStorage.getItem(SUBMITTED_PARTS_KEY);
    if (savedSubmittedParts) {
      try {
        const parsedSubmittedParts = JSON.parse(savedSubmittedParts);
        setSubmittedParts(parsedSubmittedParts);
      } catch (error) {
        console.error("Error parsing submitted parts:", error);
      }
    } else {
      // If no submitted parts info exists, create it based on scores
      const savedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedScores) {
        try {
          const parsedScores = JSON.parse(savedScores);

          // Create a new submitted parts object
          const newSubmittedParts = {
            speaking: { 1: false, 2: false, 3: false, 4: false },
            writing: { 1: false, 2: false, 3: false, 4: false },
          };

          // For backward compatibility: assume existing scores were submitted
          // In a real app, you'd want to track this separately from the beginning
          if (parsedScores.speaking) {
            for (let part = 1; part <= 4; part++) {
              if (parsedScores.speaking[part]) {
                // Check if this part has any scores
                const hasScores =
                  Object.keys(parsedScores.speaking[part]).length > 0;
                newSubmittedParts.speaking[part] = hasScores;
              }
            }
          }

          if (parsedScores.writing) {
            for (let part = 1; part <= 4; part++) {
              if (parsedScores.writing[part]) {
                // Check if this part has any scores
                const hasScores =
                  Object.keys(parsedScores.writing[part]).length > 0;
                newSubmittedParts.writing[part] = hasScores;
              }
            }
          }

          setSubmittedParts(newSubmittedParts);
          localStorage.setItem(
            SUBMITTED_PARTS_KEY,
            JSON.stringify(newSubmittedParts)
          );
        } catch (error) {
          console.error("Error parsing scores:", error);
        }
      }
    }
  };

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

  // Calculate total score and category
  const calculateTotalAndCategory = (type) => {
    const parts = ["1", "2", "3", "4"];

    // Check if all parts have been submitted
    const allPartsSubmitted = parts.every((part) => submittedParts[type][part]);

    if (!allPartsSubmitted) {
      return "-";
    }

    // Calculate total score from submitted parts
    const total = parts.reduce((sum, part) => {
      if (submittedParts[type][part]) {
        return sum + (totalScores[type][part] || 0);
      }
      return sum;
    }, 0);

    // Get category
    const category = getCategoryFromScore(total, type);

    return `${total} | ${category}`;
  };

  const columns = [
    {
      title: "PART",
      dataIndex: "part",
      key: "part",
      width: 150,
      onHeaderCell: () => ({
        className:
          "!bg-[#E6F0FA] !h-[74px] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-gray-700 font-medium" }),
    },
    {
      title: "PART 1",
      dataIndex: "part1",
      key: "part1",
      onHeaderCell: () => ({
        className: "!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-center" }),
    },
    {
      title: "PART 2",
      dataIndex: "part2",
      key: "part2",
      onHeaderCell: () => ({
        className: "!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-center" }),
    },
    {
      title: "PART 3",
      dataIndex: "part3",
      key: "part3",
      onHeaderCell: () => ({
        className: "!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-center" }),
    },
    {
      title: "PART 4",
      dataIndex: "part4",
      key: "part4",
      onHeaderCell: () => ({
        className: "!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-center" }),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      onHeaderCell: () => ({
        className: "!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center",
      }),
      onCell: () => ({ className: "text-center font-semibold" }),
    },
  ];

  const getDataSource = (type) => [
    {
      key: type,
      part: (
        <div className="flex justify-center items-center bg-[#E6F0FA] w-full h-[74px] px-2 py-1 text-gray-600 text-center font-semibold">
          SCORE
        </div>
      ),
      part1: (
        <span className="text-[#003087] font-medium">
          {submittedParts[type]["1"] ? totalScores[type]["1"] : "-"}
        </span>
      ),
      part2: (
        <span className="text-[#003087] font-medium">
          {submittedParts[type]["2"] ? totalScores[type]["2"] : "-"}
        </span>
      ),
      part3: (
        <span className="text-[#003087] font-medium">
          {submittedParts[type]["3"] ? totalScores[type]["3"] : "-"}
        </span>
      ),
      part4: (
        <span className="text-[#003087] font-medium">
          {submittedParts[type]["4"] ? totalScores[type]["4"] : "-"}
        </span>
      ),
      total: (
        <span className="text-[#003087] font-semibold">
          {calculateTotalAndCategory(type)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="relative">
        <h2 className="font-bold text-[30px] leading-[38px] text-black mt-[42px]">
          {activeTab === "writing" ? "Writing" : "Speaking"} Assessment Parts
        </h2>
        <p className="absolute font-medium text-[18px] leading-[26px] text-[#637381] mt-[11px]">
          Detailed breakdown of each part in the{" "}
          {activeTab === "writing" ? "writing" : "speaking"} assessment.
        </p>

        <Tabs
          activeKey={activeTab}
          className="flex flex-row-reverse"
          onChange={handleTabClick}
          items={[
            {
              key: "writing",
              label: (
                <span
                  style={{
                    width: 185,
                    height: 63,
                    padding: "18px 40px",
                    gap: 10,
                    borderBottomWidth: 2,
                  }}
                  className={`${
                    activeTab === "writing"
                      ? "text-[#003087] bg-[#E6F0FA] border-b-2 border-[#003087]"
                      : "text-gray-500"
                  }`}
                >
                  <EditOutlined /> Writing
                </span>
              ),
            },
            {
              key: "speaking",
              label: (
                <span
                  style={{
                    width: 215,
                    height: 63,
                    padding: "18px 40px",
                    gap: 10,
                    borderBottomWidth: 2,
                  }}
                  className={`${
                    activeTab === "speaking"
                      ? "text-[#003087] bg-[#E6F0FA] border-b-2 border-[#003087]"
                      : "text-gray-500"
                  }`}
                >
                  <AudioOutlined /> Speaking
                </span>
              ),
            },
          ]}
        />
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={getDataSource(activeTab)}
          pagination={false}
          bordered={false}
          className="shadow-lg rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default AssessmentScores;
