import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Assessment } from "@features/grading/ui/Assessment";
import AssessmentScores from "@features/grading/ui/AssessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";
import { SpeakingApi, WritingApi } from "@features/grading/api";
import { Spin } from "antd";

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
  };

  if (isWritingPending || isSpeakingPending) return <Spin size="large" className="flex justify-center items-center h-60" />;

  return (
    <>
      {/* Student Information Card */}
      <StudentInfoCard
        student={data1}
        onViewList={() => setIsModalOpen(true)}
      />
      <hr className="mt-[42px] mb-[37px] opacity-40" />
      <AssessmentScores onTabChange={onTabChange} />

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
    </>
  );
};
