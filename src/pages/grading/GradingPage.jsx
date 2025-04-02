import { Assessment } from "@features/grading/ui/Assessment";
import AssessmentComponent from "@features/grading/ui/assessmentScores";

export const GradingPage = () => {
      const data1 = {
        writing: [8, 3, 3, 15],
        speaking: [7, 4, 5, 10],
        };
    return (
        <div>
            <AssessmentComponent data={data1} />
            <Assessment />
        </div>
    );
}
