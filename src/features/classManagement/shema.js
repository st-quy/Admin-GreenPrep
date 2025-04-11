import * as Yup from "yup";

export const CreateClassSchema = Yup.object().shape({
  className: Yup.string()
    .required("Class name is required")
    .min(1, "Class name must be at least 1 characters")
});