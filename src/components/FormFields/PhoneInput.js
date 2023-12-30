import React, {useCallback, useEffect} from "react";
import * as Yup from "yup";
import "yup-phone";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import {Field, useFormikContext, useField} from "formik";

export const PhoneInput = ({name, label, handleUpdateSchema, ...restProps}) => {
  const form = useFormikContext();
  const [field, meta, helpers] = useField(name);

  console.log(field, "field");

  const {
    inputValue,
    phone,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry: false,
    countries: defaultCountries,
    onChange: (data) => {
      console.log("form", form, data);
    },
    forceDialCode: true,
  });

  useEffect(() => {
    handleCountryChange(country);
  }, []);

  const handleCountryChange = useCallback(
    (country) => {
      handleUpdateSchema(
        "Phone Number",
        Yup.string()
          .phone("TR", "Telefon geçersiz.")
          .required("Phone Number is required."),
      );
      setCountry(country);
    },
    [country],
  );

  return (
    <Field name={name}>
      {({field, form, meta}) => {
        const isError = meta.touched && meta.error;
        // console.log("form hottori", field, isError);
        return (
          <div className="realtive">
            <div
              className={`flex items-center border rounded-lg appearance-none ${
                isError
                  ? "border-red-700 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
                  : "border-gray-400 dark:border-gray-600 dark:focus:border-gray-500 focus:border-gray-900"
              }`}
            >
              <select
                onChange={(e) => handleCountryChange(e.target.value)}
                style={{width: 50}}
              >
                {defaultCountries.map((c) => {
                  const country = parseCountry(c);

                  console.log(country);
                  return (
                    <option key={country.iso2} value={country.iso2}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              {/* <div className="flex-auto">+{country.dialCode}</div> */}
              <div className="flex-1">
                <input
                  {...field}
                  className={`block border-none px-4 py-5 w-full rounded-lg font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-0 transition-colors duration-300 bg-white bg-opacity-20 focus:bg-opacity-100 caret-slate-600 peer`}
                  type="text"
                  name={name}
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    handlePhoneValueChange(e);

                    form.setFieldValue(name, e.target.value);
                    form.setFieldTouched(name);
                    field.onChange(e);
                  }}
                />

                <label
                  // htmlFor={`phone-${id}`}
                  className={`peer-focus:font-medium absolute duration-200 transform -translate-y-8 translate-x-10 bg-white scale-75 top-5 left-4 z-10 origin-[0] peer-focus:start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-x-0 peer peer-focus:-translate-y-8 peer peer-focus:bg-white ${
                    isError
                      ? "text-red-700 dark:text-red-500 peer-focus:text-red-700 peer-focus:dark:text-red-500"
                      : "text-gray-900 dark:text-gray-800 peer-focus:text-gray-900 peer-focus:dark:text-gray-500"
                  }`}
                >
                  {label}
                </label>
              </div>
            </div>
          </div>
        );
      }}
    </Field>
  );
};
