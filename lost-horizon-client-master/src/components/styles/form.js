import React from "react";
import { Form as FinalForm } from "react-final-form";

export function Form(props) {
  return (
    <FinalForm
      onSubmit={props.onSubmit}
	  validate={props.validate}
      render={renderProps => (
        <form onSubmit={renderProps.handleSubmit}>
          {props.children(renderProps)}
        </form>
      )}
    />
  );
}
