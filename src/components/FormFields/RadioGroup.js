import React from "react";

import {Field} from "formik";
import PropTypes from "prop-types";
import {uniqueId} from "lodash";
import ErrorText from "./common/ErrorText";

const RadioGroup = ({name, options, label, setState, ...props}) => {
  return (
    <Field name={name}>
      {({field, form, meta}) => {
        const isError = meta.error && meta.touched;
        return (
          <div className="relative mb-10">
            {label && (
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {label}
              </h3>
            )}
            <ul
              className={`items-center w-full font-medium text-gray-900 bg-white border  rounded-lg sm:flex dark:bg-transparent  dark:text-white ${
                isError
                  ? "border-red-700 dark:border-red-500"
                  : "border-gray-400 dark:border-gray-800"
              }`}
            >
              {options.map((option, i) => {
                const isObj = typeof option === "object";
                const id = uniqueId("radio");

                return (
                  <li
                    className={`w-full ${
                      isError
                        ? "border-red-700 dark:border-red-500"
                        : "border-gray-400 dark:border-gray-600"
                    } ${
                      options.length === i + 1
                        ? "border-0"
                        : "border-b sm:border-b-0 sm:border-r"
                    }`}
                  >
                    <div className="flex items-center ps-3">
                      <Field
                        type="radio"
                        id={id}
                        {...field}
                        className={`w-4 h-4 focus:ring-2 text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500 ${
                          isError
                            ? "border-red-400 dark:border-red-500 bg-red-50"
                            : "bg-gray-100 border-gray-400"
                        }`}
                        value={isObj ? option.value : option}
                        onChange={(e) => {
                          if (setState) {
                            setState((prev) => {
                              return e.target.value;
                            });
                          }

                          field.onChange(e);
                        }}
                        autoComplete="off"
                      />
                      <label
                        htmlFor={id}
                        className={`w-full py-5 ms-2 font-medium  ${
                          isError
                            ? "text-red-700 dark:text-red-500"
                            : "text-gray-900 dark:text-gray-300"
                        }`}
                        key={
                          isObj
                            ? option.key
                              ? option.key
                              : option.value
                            : option
                        }
                      >
                        <span className="ms-2">
                          {isObj ? option.text : option}
                        </span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ErrorText meta={meta} />
          </div>
        );
      }}
    </Field>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export {RadioGroup};
