import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address Ex:ABC@bc.com")
    .required("Email is required"),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
      excludeEmptyString: true
    })
    .matches(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
      excludeEmptyString: true
    })
    .matches(/[0-9]/, {
      message: "Password must contain at least one number",
      excludeEmptyString: true
    })
    .matches(/[@$!%*?&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
      excludeEmptyString: true
    })
    .required("New password is required"),
});

export const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .test("passwords-match", "Passwords must match", function(value) {
      return this.parent.password === value;
    }),
});
