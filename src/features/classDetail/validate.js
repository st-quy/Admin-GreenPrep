import * as yup from "yup";

export const sessionSchema = yup.object().shape({
  sessionName: yup.string().required("Session name is required"),
  sessionKey: yup.string().required("Session key is required").min(10, "Session key must be at least 10 characters"),
  examSet: yup.string().required("Please select a exam set"),
  dateRange: yup.array().of(yup.date()).required("Date range is required"),
});

export const statusOptions = {
  NOT_STARTED: { label: "Not started", bg: "#E5E7EB", text: "#374151" },
  ONGOING: { label: "Ongoing", bg: "#E1E8FF", text: "#1C3FB7" }, // xanh dương
  COMPLETED: { label: "Completed", bg: "#DAF8E6", text: "#1A8245" }, // xanh lá
};
