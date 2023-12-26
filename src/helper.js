import React from "react";

export const novalidate = () => {
  var field = "novalidate";
  var url = window.location.href;
  if (url.indexOf("?" + field + "=") !== -1) return true;
  else if (url.indexOf("&" + field + "=") !== -1) return true;
  return false;
};

export const DisplayFormikState = (props) => (
  <div style={{margin: "1rem 0"}}>
    <h3 style={{fontFamily: "monospace"}} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
