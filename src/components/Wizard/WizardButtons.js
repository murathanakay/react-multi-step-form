import React from "react";
import {ArrowLongRightIcon} from "@heroicons/react/24/outline";

const WizardButtons = ({
  stepNum,
  lastStep,
  handleBack,
  formSending,
  formSent,
}) => {
  return (
    <div className={`my-5 d-flex `}>
      {stepNum > 0 ? (
        <button
          type="button"
          onClick={handleBack}
          className="btn_border_img btn-form-step btn-prev me-5"
        >
          <span>Previous Step</span>
        </button>
      ) : null}
      {stepNum < lastStep ? (
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next Step
          <ArrowLongRightIcon />
        </button>
      ) : (
        <button
          type="submit"
          className={`border btn_border_img btn-form-step btn-send ms-5`}
        >
          <span>Send</span>
        </button>
      )}
    </div>
  );
};

export default WizardButtons;
