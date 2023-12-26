import React from "react";
import {TextInput} from "../FormFields";

import * as Yup from "yup";

const Step1 = (props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <TextInput label="First Name*" name="First Name" />
        </div>
        <div className="">
          <TextInput label="Last Name*" name="Last Name" />
        </div>
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
    "First Name": Yup.string().required("First Name is required."),
  },

  initialValues: {
    "First Name": "",
  },
};

export default Step1Form;
