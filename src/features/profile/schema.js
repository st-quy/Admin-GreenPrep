import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),
});


export const UpdateProfileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  code: Yup.string().required("Code is required"),
  bod: Yup.string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "BOD must be in the format dd/mm/yyyy")
    .nullable(),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{9,10}$/, "Phone number must be 9-10 digits")
    .nullable(),
  address: Yup.string().nullable(),
});