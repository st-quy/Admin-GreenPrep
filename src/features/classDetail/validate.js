import * as yup from "yup";

export const sessionSchema = yup.object().shape({
  sessionName: yup.string().required("Session name is required"),
  sessionKey: yup.string().required("Session key is required"),
  examSet: yup.mixed().required("Exam set is required"),
  dateRange: yup.array().of(yup.date()).required("Date range is required"),
});
