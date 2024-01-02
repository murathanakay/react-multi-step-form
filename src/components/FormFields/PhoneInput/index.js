import React, {useCallback, useEffect} from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import {defaultCountries, usePhoneInput} from "react-international-phone";
import {FastField, useFormikContext, useField} from "formik";
import {isObject, isUndefined, uniqueId} from "lodash";
import CountryListBox from "./CountryListBox";
import ErrorText from "../common/ErrorText";

export const PhoneInput = ({name, label, handleUpdateSchema, ...restProps}) => {
  const form = useFormikContext();
  const [field] = useField(name);

  //   console.log(field, "field");

  const {
    inputValue,
    phone,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry: "us",
    countries: defaultCountries,
    onChange: (data) => {
      form.setFieldValue(name, data.inputValue);
      field.onChange(data.phone);
    },
    // forceDialCode: true,
  });

  useEffect(() => {
    form.setFieldTouched(name, false);
    handleCountryChange(country);
  }, [country]);

  const handleCountryChange = useCallback(
    (country) => {
      const c = !isUndefined(country)
        ? isObject(country)
          ? country.iso2
          : country
        : "us";

      handleUpdateSchema(
        "Phone Number",
        Yup.string()
          .phone(
            c,
            `It's not a valid phone number for region ${c.toUpperCase()}`,
          )
          .required("Phone Number is required."),
      );

      setTimeout(() => {
        setCountry(country);
      }, 16);
    },
    [country],
  );

  return (
    <FastField name={name}>
      {({field, form, meta}) => {
        const isError = meta.touched && meta.error;
        // console.log("form hottori", field, isError);
        return (
          <div className="relative z-0 w-full mb-10">
            <div
              className={`flex items-center border rounded-lg appearance-none transition-colors duration-300 focus-within:bg-white ${
                isError
                  ? "border-red-700 dark:border-red-500"
                  : "border-gray-400 dark:border-gray-600"
              }`}
            >
              <CountryListBox
                handleCountryChange={handleCountryChange}
                country={country}
                key={country}
              />
              <div className="flex-1">
                <input
                  {...field}
                  className={`block border-none ps-0 pe-4 py-5 w-full rounded-lg font-medium text-gray-900 dark:text-white bg-transparent focus:outline-none focus:bg-transparent focus:ring-0 caret-gray-600`}
                  type="text"
                  name={name}
                  ref={inputRef}
                  value={inputValue}
                  // onFocus={(e) => {
                  //   // form.setFieldTouched(name);
                  //   // field.onChange(e);
                  // }}
                  onChange={(e) => {
                    handlePhoneValueChange(e);
                    form.setFieldTouched(name);
                    form.setFieldValue(name, e.target.value);
                    field.onChange(e);
                  }}
                  autoComplete="off"
                />

                <label
                  // htmlFor={`phone-${id}`}
                  className={`font-medium absolute duration-200 transform -translate-y-8 translate-x-0 bg-white scale-75 top-5 left-1 z-10  ${
                    isError
                      ? "text-red-700 dark:text-red-500"
                      : "text-gray-900 dark:text-gray-800"
                  }`}
                >
                  {label}
                </label>
              </div>
            </div>
            <ErrorText meta={meta} />
          </div>
        );
      }}
    </FastField>
  );
};
