import * as yup from "yup";

export const profileSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
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
      "Date of Birth must be in the format dd/mm/yyyy",
      (value) => !value || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value)
    ),
  address: yup.string().nullable().notRequired(),
});

export const yupSync = (schema) => ({
  async validator(rule, value) {
    try {
      await schema.validateSyncAt(rule.field, { [rule.field]: value });
    } catch (error) {
      throw new Error(error.message);
    }
  },
}); 