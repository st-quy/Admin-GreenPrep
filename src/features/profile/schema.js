import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(6, "Current password must be at least 6 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters"),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("New password confirmation is required"),
});


export const UpdateProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  code: Yup.string().required("Code is required"),
  bod: Yup.string().nullable(),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string().nullable(),
  address: Yup.string().nullable(),
});