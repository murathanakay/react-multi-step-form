import React, {useState} from "react";

import {Field} from "formik";
import PropTypes from "prop-types";

const TextInput = ({label, name, id, required = true, ...props}) => {
  const [error, setError] = useState(false);

  return (
    <Field name={name}>
      {({field, form, meta}) => {
        const isError = meta.touched && meta.error;

        setError(isError);
        return (
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...field}
              className={`block px-4 py-5 w-full font-medium border rounded-lg appearance-none text-gray-900 dark:text-white  focus:outline-none focus:ring-0 transition-colors duration-300 bg-white bg-opacity-20 focus:bg-opacity-100 sm:text-md caret-slate-600 ${
                isError
                  ? "border-red-700 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
                  : "border-gray-400 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-900"
              } peer`}
              placeholder=""
              title={props.desc ? props.desc : label}
              {...props}
            />
            <label
              htmlFor={id || name}
              className={`peer-focus:font-medium absolute sm:text-md duration-200 transform -translate-y-6 scale-75 top-5 left-4 -z-10 origin-[0] peer-focus:start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:z-10 peer-focus:bg-white ${
                isError
                  ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                  : "text-gray-900 dark:text-gray-800 peer-focus:text-gray-900 peer-focus:dark:text-gray-500"
              }`}
            >
              {label}
            </label>
            {required ? (
              <div
                className={`overflow-hidden transition-all duration-300 absolute left-3 bg-white ${
                  isError ? "h-[24px]" : "h-0"
                }`}
              >
                {isError ? (
                  <span className="text-[12px] font-extralight text-red-700 dark:text-red-500">
                    {meta.error}
                  </span>
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      }}
    </Field>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
};
export {TextInput};