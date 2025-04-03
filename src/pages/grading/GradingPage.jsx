import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Assessment } from "@features/grading/ui/Assessment";
import AssessmentScores from "@features/grading/ui/assessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";
import { SpeakingApi, WritingApi } from "@features/grading/api";
import { useLocation } from "react-router-dom";

export const GradingPage = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    isPending: isWritingPending,
    error: writingError,
    data: writingData,
  } = useQuery({
    queryKey: ["writingData"],
    queryFn: WritingApi.getWriting,
  });

  const {
    isPending: isSpeakingPending,
    error: speakingError,
    data: speakingData,
  } = useQuery({
    queryKey: ["speakingData"],
    queryFn: SpeakingApi.getSpeaking,
  });

  const onTabChange = (key) => {
    setIsSpeaking(key);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data1 = {
    name: "Trung",
    studentId: "123123",
    classId: "gcd1102",
    email: "trung@gmail.com",
    phone: "123123123",
    writing: [8, 3, 3, 15],
    speaking: [7, 4, 5, 10],
  };

  if (isWritingPending || isSpeakingPending) return "Loading...";

  return (
    <div className="p-8">
      {/* Student Information Card */}
      <StudentInfoCard
        student={data1}
        onViewList={() => setIsModalOpen(true)}
      />
      <hr className="mt-[42px] mb-[37px] opacity-40" />
      <AssessmentScores data={data1} onTabChange={onTabChange} />

      <hr className="mt-[42px] mb-[37px] opacity-40" />
      <Assessment
        isSpeaking={isSpeaking}
        data={isSpeaking ? speakingData : writingData}
      />

      {/* Student List Modal */}
      <StudentListModal
        data={[]}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
