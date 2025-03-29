import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const UpdateProfileForm = () => {
  const navigate = useNavigate();

  const profileSchema = yup.object().shape({
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
        (value) => !value || /^[0-9]{9,10}$/.test(value) // Chỉ kiểm tra nếu có giá trị
      ),
    bod: yup
      .string()
      .nullable()
      .notRequired()
      .test(
        "is-valid-date",
        "Date of Birth must be in the format dd/mm/yyyy",
        (value) => !value || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value) // Chỉ kiểm tra nếu có giá trị
      ),
    address: yup.string().nullable().notRequired(),
  });

  const [formValues, setFormValues] = useState({
    fullname: "Thao Nguyen",
    email: "thao.nguyen@gmail.com",
    code: "TN09090",
    phoneNumber: "0902889343",
    bod: "12/09/1989",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await profileSchema.validate(formValues, { abortEarly: false });
      navigate("/profile");
      console.log("Form submitted successfully:", formValues);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.log("Validation errors:", newErrors);
    }
  };

  const handleCancel = () => {
    setFormValues({
      fullname: "Thao Nguyen",
      email: "thao.nguyen@gmail.com",
      code: "TN09090",
      phoneNumber: "0902889343",
      bod: "12/09/1989",
      address: "",
    });
    setErrors({});
  };

  const renderInput = ({ label, name, value, onChange, required, type = "text", placeholder = "", isLast = false }) => {
    return (
      <div className="w-[458px] h-[80px] max-w-full">
        <label className="block text-sm font-medium text-[black] text-[16px] mb-2">
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-[46px] px-3 text-[16px] border rounded-lg outline-none placeholder:text-[#919EAB] bg-white ${
            errors[name] ? "border-[#FF0000]" : "border-[#6B7280]"
          }`}
          required={required}
        />
        {errors[name] && <p className="mt-1 text-sm text-[#FF0000]">{errors[name]}</p>}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="flex items-center justify-center md:justify-end gap-[10px] mt-[40px] w-[100%] md:w-[90%] mb-[5%] md:mb-[0px]">
        <button
          type="button"
          onClick={handleCancel}
          className="h-[50px] w-[113px] text-[#3758F9] text-base font-medium rounded-[50px] border border-[#3758F9] hover:bg-[#3758F9] hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-[50px] w-[113px] bg-[#3758F9] text-white text-base font-medium rounded-[50px] border-none hover:bg-[#2944c1] transition-colors"
        >
          Update
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 md:w-full max-w-fit md:max-w-[1242px] h-auto md:h-[611px] mx-auto rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-lg w-auto md:w-full h-full flex flex-col justify-center items-center"
      >
        <div className="mb-[2.5%] text-left w-[90%] mt-[5%] md:mt-[0px]">
          <h4 className="text-black text-[2rem] font-bold leading-[2.375rem] mb-[0.75rem]">
            Update profile
          </h4>
          <p className="text-[#637381] text-[1.125rem] font-medium leading-[1.625rem]">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-[25px] w-[90%] mx-auto">
          <div className="md:justify-self-start">
            {renderInput({
              label: "Fullname",
              name: "fullname",
              value: formValues.fullname,
              onChange: handleChange,
              required: true,
            })}
          </div>
          <div className="md:justify-self-end">
            {renderInput({
              label: "Email",
              name: "email",
              value: formValues.email,
              onChange: handleChange,
              required: true,
            })}
          </div>
          <div className="md:justify-self-start">
            {renderInput({
              label: "Code",
              name: "code",
              value: formValues.code,
              onChange: handleChange,
              required: true,
            })}
          </div>
          <div className="md:justify-self-end">
            {renderInput({
              label: "Phone number",
              name: "phoneNumber",
              value: formValues.phoneNumber,
              onChange: handleChange,
              required: false,
            })}
          </div>
          <div className="md:justify-self-start">
            {renderInput({
              label: "Date of Birth",
              name: "bod",
              value: formValues.bod,
              onChange: handleChange,
              required: false,
              placeholder: "dd/mm/yyyy",
            })}
          </div>
          <div className="md:justify-self-end">
            {renderInput({
              label: "Address",
              name: "address",
              value: formValues.address,
              onChange: handleChange,
              required: false,
            })}
          </div>
        </div>

        {renderButtons()}
      </form>
    </div>
  );
};

export default UpdateProfileForm;
