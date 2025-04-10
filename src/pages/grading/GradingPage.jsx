import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";

import Assessment from "@features/grading/ui/Assessment";
import AssessmentScores from "@features/grading/ui/AssessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";
import { SpeakingApi, WritingApi, ParticipantApi } from "@features/grading/api";

const GradingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, participantId } = useParams();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending: isParticipantsPending, data: participantsData } = useQuery(
    {
      queryKey: ["participants"],
      queryFn: () => ParticipantApi.getParticipants(sessionId),
    }
  );

  const { isPending: isWritingPending, data: writingData } = useQuery({
    queryKey: ["writingData"],
    queryFn: WritingApi.getWriting,
  });

  const { isPending: isSpeakingPending, data: speakingData } = useQuery({
    queryKey: ["speakingData"],
    queryFn: SpeakingApi.getSpeaking,
  });

  const onTabChange = (key) => {
    setIsSpeaking(key);
  };

  const changeParticipant = (participantId) => {
    const newPath = location.pathname.replace(
      /participant\/[^/]+/,
      `participant/${participantId}`
    );
    setIsModalOpen(false);
    navigate(newPath);
  };

  const data1 = {
    name: "Trung",
    studentId: "123123",
    classId: "gcd1102",
    email: "trung@gmail.com",
    phone: "123123123",
  };

  if (isWritingPending || isSpeakingPending || isParticipantsPending)
    return (
      <Spin size="large" className="flex justify-center items-center h-60" />
    );

  return (
    <>
      {/* Student Information Card */}
      <StudentInfoCard
        student={data1}
        onViewList={() => setIsModalOpen(true)}
        onNext={() => {}}
        onPrevious={() => {}}
      />
      <AssessmentScores onTabChange={onTabChange} />
      <Assessment
        isSpeaking={isSpeaking}
        data={isSpeaking ? speakingData : writingData}
      />{" "}
      {/* Student List Modal */}
      <StudentListModal
        data={participantsData?.data.data}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleSelect={changeParticipant}
      />
    </>
  );
};

export default GradingPage;
