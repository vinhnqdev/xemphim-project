import React from "react";

function TextError(props) {
  return <div className="form__error">*{props.children}</div>;
}

export default TextError;
