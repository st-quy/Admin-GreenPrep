import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include lowercase letter, 1 uppercase letter, 1 number and 1 special character(@$!%*?&)."
    ),
  passwordConfirmation: Yup.string()
    .required("Password confirmation is required")
    .when('password', {
      is: val => val && val.length > 0,
      then: schema => schema.test({
        name: 'passwords-match',
        message: 'Passwords must match',
        test: function(value) {
          return this.parent.password === value;
        }
      })
    }),
    
});
