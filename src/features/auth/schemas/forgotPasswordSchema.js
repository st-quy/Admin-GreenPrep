import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address Ex:ABC@bc.com").required("Email is required"),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters include uppercase letter, number and special character.")
    .required("New password is required."),
});

export const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .required("Confirm new password is required."),
});
