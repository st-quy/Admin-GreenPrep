import * as yup from "yup";

export const profileSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Fullname is required")
    .matches(/^[A-Za-z\s]+$/, "Fullname can only contain letters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  code: yup.string().required("Code is required"),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-phone",
      "Phone number must be 9-10 digits",
      (value) => !value || /^[0-9]{9,10}$/.test(value)
    ),
  bod: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-date",
      "Date of Birth must be in format dd/mm/yyyy",
      (value) =>
        !value ||
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)
    ),
  address: yup.string().nullable().notRequired(),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
}); 