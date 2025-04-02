import { useState } from "react";

import { Assessment } from "@features/grading/ui/Assessment";
import AssessmentScore from "@features/grading/ui/AssessmentScores";
import StudentInfoCard from "@features/grading/ui/StudentInfoCard";
import StudentListModal from "@features/grading/ui/StudentListModal";

export const GradingPage = () => {
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
  return (
    <>
      {/* Student Information Card */}
      <StudentInfoCard
        student={data1}
        onViewList={() => setIsModalOpen(true)}
      />
      <hr className="mt-[42px] mb-[37px] opacity-40" />
      <AssessmentScore data={data1} />

      <hr className="mt-[42px] mb-[37px] opacity-40" />
      <Assessment />

      {/* Student List Modal */}
      <StudentListModal
        data={[]}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
