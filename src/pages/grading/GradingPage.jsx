import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import Assessment from "@features/grading/ui/Assessment";
import AssessmentScores from "@features/grading/ui/AssessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";
import {
  useGetParticipants,
  useGetSessionDetail,
  useGetSpeaking,
  useGetWriting,
} from "@features/grading/hooks";

const GradingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, participantId } = useParams();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isPending: isSessionPending, data: sessionData } =
    useGetSessionDetail(sessionId);
  const { isPending: isWritingPending, data: writingData } = useGetWriting(
    sessionData.data.data.examSet
  );
  const { isPending: isSpeakingPending, data: speakingData } = useGetSpeaking(
    sessionData.data.data.examSet
  );
  const { isPending: isParticipantsPending, data: participantsData } =
    useGetParticipants(sessionId);
  const onTabChange = (key) => {
    setIsSpeaking(key);
  };

  // Function to handle the change of participant
  const changeParticipant = (participantId) => {
    const newPath = location.pathname.replace(
      /participant\/[^/]+/,
      `participant/${participantId}`
    );
    setIsModalOpen(false);
    setIsSpeaking(false);
    navigate(newPath);
  };

  const handleNextParticipant = () => {
    const currentIndex = participantsData?.data.data.findIndex(
      (item) => item.ID === participantId
    );
    const nextIndex = (currentIndex + 1) % participantsData?.data.data.length;
    const nextParticipantId = participantsData?.data.data[nextIndex].ID;
    changeParticipant(nextParticipantId);
  };

  const handlePreviousParticipant = () => {
    const currentIndex = participantsData?.data.data.findIndex(
      (item) => item.ID === participantId
    );
    const previousIndex =
      (currentIndex - 1 + participantsData?.data.data.length) %
      participantsData?.data.data.length;
    const previousParticipantId = participantsData?.data.data[previousIndex].ID;
    changeParticipant(previousParticipantId);
  };

  const userData = participantsData?.data.data.find(
    (item) => item.ID === participantId
  );

  if (
    isSessionPending ||
    isWritingPending ||
    isSpeakingPending ||
    isParticipantsPending
  )
    return (
      <Spin size="large" className="flex justify-center items-center h-60" />
    );

  return (
    <>
      {/* Student Information Card */}
      <StudentInfoCard
        student={userData}
        onViewList={() => setIsModalOpen(true)}
        onNext={handleNextParticipant}
        onPrevious={handlePreviousParticipant}
      />
      <AssessmentScores onTabChange={onTabChange} currentUser={participantId} />
      <Assessment
        isSpeaking={isSpeaking}
        currentUser={participantId}
        data={isSpeaking ? speakingData : writingData}
      />{" "}
      {/* Student List Modal */}
      <StudentListModal
        currentUser={userData}
        data={participantsData?.data.data}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleSelect={changeParticipant}
      />
    </>
  );
};

export default GradingPage;
