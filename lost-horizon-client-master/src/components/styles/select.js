import React from "react";
import styled from "styled-components";
import { useField } from "react-final-form";

export const __STANDARD_CSS_DECORATOR = `rounded-md bg-cyan-900/50 w-full h-12 mb-1 text-white`;
export const __STANDARD_LABEL_DECORATOR = `text-sm text-gray-300 self-start pl-2`;

const SelectWrapper = styled.div`
`;

const SelectContainer = styled.select`
  padding: 5px 45px 5px 15px;
  font-size: 19px;
  outline: none;
  transition: all 250ms ease-in-out;
  border-radius: 9px;
  border: ${props => (props.error ? `1px solid #e74c3c` : 0)};
  // height: 2em;
  // color: #2f3337;
  // background-color: #ececec;
  // box-shadow: "0px 0px 5px name="flight" 1px #0783EF";

  &:hover {
    box-shadow: ${props =>
      props.error ? `0px 0px 5px 0px #e74c3c` : `0px 0px 5px 0px #0783EF`};
  }

  &:focus {
    outline: 0;
    box-shadow: ${props =>
      props.error ? `0px 0px 10px 1px #e74c3c` : `0px 0px 10px 1px #0783EF`};
  }

  &::placeholder {
    color: grey;
  }
`;

const ErrorText = styled.div`
  // margin-top: 5px;
  color: #e74c3c;
  font-size: 15px;
  padding: 0px 4px;
  min-height: 24px;
`;

export function Select(props) {
  const {
    input,
    meta: { error, touched, submitError }
  } = useField(props.name, {
    initialValue: props.initialValue,
    validate: props.validate,
    error: props.error
  });

  const selectProps = {
    ...props,
    error: touched && error && true,
    ...input
  };

  return (
    <SelectWrapper>
      <SelectContainer className={__STANDARD_CSS_DECORATOR} {...selectProps} />
      {/* <ErrorText>{touched && (error || submitError) ? error : ""}</ErrorText> */}
      {props && (
       <ErrorText>{touched && props.error}</ErrorText>
      )}
    </SelectWrapper>
  );
}
