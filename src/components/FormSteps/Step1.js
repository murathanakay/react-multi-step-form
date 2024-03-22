import React from "react";
import {PhoneInput, RadioGroup, TextInput, DatePicker} from "../FormFields";

import * as Yup from "yup";

// import "yup-phone";

const Step1 = (props) => {
  const genderOptions = ["Male", "Female", "Rather not to say"];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <TextInput label="First Name*" name="First Name" />
        <TextInput label="Last Name*" name="Last Name" />
      </div>
      <div className="grid grid-cols-1 md:gap-5">
        <RadioGroup name="Gender" options={genderOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <DatePicker
          label="Birthday"
          name="Birthday"
          maxDate={new Date("2005-01-01")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <PhoneInput
          name="Phone Number"
          label="Phone Number"
          handleUpdateSchema={props.handleUpdateSchema}
        />
        <TextInput label="E-mail" name="E-mail" />
      </div>
    </>
  );
};

const Step1Form = {
  component: Step1,

  stepper: {
    title: "Personal Info",
  },

  validationSchema: {
    "First Name": Yup.string()
      .min("2", "too short")
      .required("First Name is required."),
    "Last Name": Yup.string()
      .min("2", "too short")
      .required("Last Name is required."),
    "E-mail": Yup.string().email().required("E-mail is required."),

    Gender: Yup.string()
      // .oneOf(["Male", "Female"])..etc
      .required("Must select one of the above."),
    "Phone Number": Yup.string(),

    Birthday: Yup.string().required("Birthday is required."),
  },

  initialValues: {
    "First Name": "",
    "Last Name": "",
    "E-mail": "",
    Gender: "",
    "Phone Number": "",
    Birthday: "",
  },
};

export default Step1Form;
