import React from "react";

const ErrorText = ({meta}) => {
  const isError = meta.touched && meta.error;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 absolute left-3 ${
        isError ? "h-[24px]" : "h-0"
      }`}
    >
      {isError ? (
        <span className="text-[12px] font-extralight text-red-700 dark:text-red-500">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
};

export default ErrorText;
