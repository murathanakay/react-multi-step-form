import React, {useState} from "react";

import {Field} from "formik";
import PropTypes from "prop-types";
import {uniqueId} from "lodash";
import ErrorText from "./common/ErrorText";

const TextInput = ({label, name, ...props}) => {
  const id = uniqueId("text");
  return (
    <Field name={name}>
      {({field, form, meta}) => {
        const isError = meta.touched && meta.error;

        return (
          <div class="relative z-0 w-full mb-8 group">
            <input
              id={id}
              type="text"
              {...field}
              className={`block px-4 py-5 w-full font-medium border rounded-lg appearance-none text-gray-900 dark:text-white  focus:outline-none focus:ring-0 transition-colors duration-300 bg-transparent focus:bg-white dark:bg-transparent dark:focus:bg-gray-950 caret-gray-600 ${
                isError
                  ? "border-red-700 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
                  : "border-gray-400 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-800"
              } peer`}
              placeholder=""
              title={props.desc ? props.desc : label}
              {...props}
              // onFocus={(e) => {
              //   form.setFieldTouched(field.name);
              //   field.onChange(e);
              // }}
            />
            <label
              htmlFor={id}
              className={`font-medium absolute duration-200 transform -translate-y-8 bg-white scale-75 top-5 left-4 z-10 origin-[0] peer-focus:start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer peer-focus:bg-white dark:peer-focus:bg-gray-950 dark:bg-gray-950 ${
                isError
                  ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                  : "text-gray-900 dark:text-gray-300 peer-focus:text-gray-900 peer-focus:dark:text-gray-500"
              }`}
            >
              {label}
            </label>
            <ErrorText meta={meta} />
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
