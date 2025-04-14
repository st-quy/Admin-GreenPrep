import * as yup from "yup";

export const sessionSchema = yup.object().shape({
  sessionName: yup.string().required("Session name is required"),
  sessionKey: yup.string().required("Session key is required").min(10, "Session key must be at least 10 characters"),
  examSet: yup.string().required("Please select a exam set"),
  dateRange: yup.array().of(yup.date()).required("Date range is required"),
});
