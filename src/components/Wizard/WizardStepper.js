import React from "react";

import {ChevronDoubleRightIcon, CheckIcon} from "@heroicons/react/24/outline";

const WizardStepper = (props) => (
  <ol class="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
    {props.steps.map((item, index) => {
      return (
        <li
          class={`flex items-center ${
            index === props.stepNum || item.completed
              ? "text-blue-600 dark:text-blue-50"
              : ""
          }`}
        >
          <span
            class={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
              index === props.stepNum ? "text-blue-600 dark:text-blue-50" : ""
            } ${item.completed ? "bg-blue-600" : ""} ${
              item.completed || index === props.stepNum
                ? "border-blue-600 dark:border-blue-500"
                : "border-gray-500 dark:border-gray-400"
            }`}
          >
            {item.completed ? <CheckIcon /> : index + 1}
          </span>
          {item.title}
          {index < props.stepNum && (
            <ChevronDoubleRightIcon className="w-5 h-5" />
          )}
        </li>
      );
    })}
  </ol>
);

export default WizardStepper;
