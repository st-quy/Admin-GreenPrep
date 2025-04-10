import * as Yup from "yup";

const strictEmailRegex = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/;

export const emailSchema = Yup.object().shape({
  email: Yup
    .string()
    // .email("Please enter a valid email address Ex:abc@fpt.com")
    .required("Email is required")
    .matches(
      strictEmailRegex,
      "Please enter a valid email address (Ex:abc@fpt.com)"
    ),
});