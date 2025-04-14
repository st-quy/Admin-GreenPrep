import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import Assessment from "@features/grading/ui/Assessment";
import AssessmentScores from "@features/grading/ui/AssessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";
import ScrollToTop from "@features/grading/utils/ScrollToTop";

import {
  useGetParticipants,
  useGetSpeakingQuestionsAnswers,
  useGetWritingQuestionsAnswers,
  useAudioFileName,
} from "@features/grading/hooks";

const GradingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, participantId, classId } = useParams();

  // const { data: audioFileName } = useAudioFileName(classId, sessionId);
  // console.log(audioFileName);

  const currentParticipantIdRef = useRef(participantId);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakingComments, setSpeakingComments] = useState([]);
  const [writingComments, setWritingComments] = useState([]);

  const [isChangingParticipant, setIsChangingParticipant] = useState(false);

  const {
    isPending: isWritingPending,
    data: writingData,
    refetch: refetchWriting,
  } = useGetWritingQuestionsAnswers(participantId);
  const {
    isPending: isSpeakingPending,
    data: speakingData,
    refetch: refetchSpeaking,
  } = useGetSpeakingQuestionsAnswers(participantId);
  const { isPending: isParticipantsPending, data: participantsData } =
    useGetParticipants(sessionId);

  const onTabChange = (key) => {
    setIsSpeaking(key);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const skillParam = searchParams.get("skill");
  
    if (skillParam === "speaking") {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
    console.log(location.search);
  }, [location.search]);

  // Handle participant change
  useEffect(() => {
    if (currentParticipantIdRef.current !== participantId) {
      setIsChangingParticipant(true);
      refetchWriting();
      refetchSpeaking();
      setSpeakingComments([]);
      setWritingComments([]);
      currentParticipantIdRef.current = participantId;
    }
  }, [participantId]);

  // Extract comments from database data
  const extractCommentsFromData = (data, part) => {
    if (
      !data ||
      !data.data ||
      !data.data.data ||
      !data.data.data.topic ||
      !data.data.data.topic.Parts
    ) {
      return [];
    }

    const comments = [];
    try {
      const partData = data.data.data.topic.Parts.find(
        (p) =>
          p.Content &&
          p.Content.toLowerCase().includes(`part ${part}`.toLowerCase())
      );

      if (partData && partData.Questions) {
        partData.Questions.forEach((question) => {
          if (
            question.studentAnswer &&
            question.studentAnswer.ID &&
            question.studentAnswer.Comment
          ) {
            comments.push({
              studentAnswerId: question.studentAnswer.ID,
              messageContent: question.studentAnswer.Comment,
              part: part,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error extracting comments:", error);
    }

    return comments;
  };

  // Initialize writing comments from database when data is loaded
  useEffect(() => {
    if (!isWritingPending && writingData) {
      if (currentParticipantIdRef.current === participantId) {
        const allWritingComments = [];
        for (let part = 1; part <= 4; part++) {
          const partComments = extractCommentsFromData(
            writingData,
            part.toString()
          );
          allWritingComments.push(...partComments);
        }
        setWritingComments(allWritingComments);
        setIsChangingParticipant(false);
      }
    }
  }, [isWritingPending, writingData, participantId]);

  // Initialize speaking comments from database when data is loaded
  useEffect(() => {
    if (!isSpeakingPending && speakingData) {
      if (currentParticipantIdRef.current === participantId) {
        const allSpeakingComments = [];
        for (let part = 1; part <= 4; part++) {
          const partComments = extractCommentsFromData(
            speakingData,
            part.toString()
          );
          allSpeakingComments.push(...partComments);
        }
        setSpeakingComments(allSpeakingComments);
        setIsChangingParticipant(false);
      }
    }
  }, [isSpeakingPending, speakingData, participantId]);

  // Handle comment changes from Assessment component
  const handleCommentChange = (commentData) => {
    const {
      studentAnswerId,
      messageContent,
      isSpeaking,
      part,
      isPartFour,
      allStudentAnswerIds,
    } = commentData;

    // Don't update comments if we're in the middle of changing participants
    if (isChangingParticipant) return;

    if (isSpeaking) {
      // Special handling for speaking part 4
      if (isPartFour && allStudentAnswerIds && allStudentAnswerIds.length > 0) {
        setSpeakingComments((prevComments) => {
          const updatedComments = [...prevComments];

          // Remove any existing comments for part 4
          const filteredComments = updatedComments.filter(
            (comment) =>
              !(
                comment.part === "4" &&
                allStudentAnswerIds.includes(comment.studentAnswerId)
              )
          );

          // Add new comments for all student answers in part 4
          const newComments = allStudentAnswerIds.map((id) => ({
            studentAnswerId: id,
            messageContent,
            part: "4",
          }));

          return [...filteredComments, ...newComments];
        });
      } else {
        // Normal handling for other parts
        setSpeakingComments((prevComments) => {
          // Check if this studentAnswerId and part already exists in the array
          const existingIndex = prevComments.findIndex(
            (comment) =>
              comment.studentAnswerId === studentAnswerId &&
              comment.part === part
          );

          if (existingIndex >= 0) {
            // Update existing comment
            const updatedComments = [...prevComments];
            updatedComments[existingIndex] = {
              studentAnswerId,
              messageContent,
              part,
            };
            return updatedComments;
          } else {
            // Add new comment
            return [...prevComments, { studentAnswerId, messageContent, part }];
          }
        });
      }
    } else {
      // Update writing comments
      setWritingComments((prevComments) => {
        // Check if this studentAnswerId and part already exists in the array
        const existingIndex = prevComments.findIndex(
          (comment) =>
            comment.studentAnswerId === studentAnswerId && comment.part === part
        );

        if (existingIndex >= 0) {
          // Update existing comment
          const updatedComments = [...prevComments];
          updatedComments[existingIndex] = {
            studentAnswerId,
            messageContent,
            part,
          };
          return updatedComments;
        } else {
          // Add new comment
          return [...prevComments, { studentAnswerId, messageContent, part }];
        }
      });
    }
  };

  // Function to prepare comments for submission
  const prepareCommentsForSubmission = (comments) => {
    const groupedComments = {};

    comments.forEach((comment) => {
      groupedComments[comment.studentAnswerId] = {
        studentAnswerId: comment.studentAnswerId,
        messageContent: comment.messageContent,
      };
    });

    // Convert back to array for submission
    return Object.values(groupedComments);
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

  //Current User
  const userData = participantsData?.data.data.find(
    (item) => item.ID === participantId
  );

  if (isWritingPending || isSpeakingPending || isParticipantsPending)
    return (
      <Spin size="large" className="flex justify-center items-center h-60" />
    );

  return (
    <div className="p-8">
      <ScrollToTop />
      {/* Student Information Card */}
      <StudentInfoCard
        student={userData}
        onViewList={() => setIsModalOpen(true)}
        onNext={handleNextParticipant}
        onPrevious={handlePreviousParticipant}
      />
      <AssessmentScores
        onTabChange={onTabChange}
        currentUser={participantId}
        speakingComments={prepareCommentsForSubmission(speakingComments)}
        writingComments={prepareCommentsForSubmission(writingComments)}
        defaultTab={isSpeaking ? "speaking" : "writing"}
      />
      <Assessment
        key={`assessment-${isSpeaking ? "speaking" : "writing"}`}
        isSpeaking={isSpeaking}
        currentUser={participantId}
        data={isSpeaking ? speakingData : writingData}
        onCommentChange={handleCommentChange}
        speakingComments={speakingComments}
        writingComments={writingComments}
      />
      {/* Student List Modal */}
      <StudentListModal
        currentUser={userData}
        data={participantsData?.data.data}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleSelect={changeParticipant}
      />
    </div>
  );
};

export default GradingPage;
