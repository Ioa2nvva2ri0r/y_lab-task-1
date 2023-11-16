import React, { useId } from "react";
// Utils
import { capitalizedString, convertInString } from "utils/convert";
// Styles
import styles from "./input.module.scss";
// Types
interface IInput extends React.AllHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  classNameLabel?: string;
}

const Input: React.FC<IInput> = (props) => {
  const { id, placeholder, classNameLabel, className, ...allProps } = props;
  // React ID
  const _id = useId();

  return (
    <label
      className={convertInString(styles.label, classNameLabel)}
      htmlFor={_id}
      data-text={placeholder}
    >
      <input
        id={_id}
        placeholder={capitalizedString(placeholder)}
        className={convertInString(styles.input, className)}
        {...allProps}
      />
      <span data-placeholder>{placeholder}</span>
    </label>
  );
};

export default Input;
