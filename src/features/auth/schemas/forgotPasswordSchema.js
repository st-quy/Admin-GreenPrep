import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address Ex:hoaltm@fpt.com")
    .required("Email is required"),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters, at least ")
    .matches(/[A-Z]/, {
      message: "one uppercase letter",
      excludeEmptyString: true
    })
    .matches(/[a-z]/, {
      message: "lowercase letter",
      excludeEmptyString: true
    })
    .matches(/[0-9]/, {
      message: "one number",
      excludeEmptyString: true
    })
    .matches(/[@$!%*?&]/, {
      message: "one special character (@$!%*?&)",
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
