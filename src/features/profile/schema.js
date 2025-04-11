import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("New password confirmation is required")
    .when('newPassword', {
      is: val => val && val.length > 0,
      then: schema => schema.test({
        name: 'passwords-match',
        message: 'Passwords must match',
        test: function(value) {
          return this.parent.newPassword === value;
        }
      })
    }),
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
  phoneNumber: Yup.string()
    .matches(/^\d{9,10}$/, "Phone number must be 9-10 digits")
    .nullable(),
  address: Yup.string().nullable(),
});