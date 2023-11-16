import React from "react";
// Styles
import styles from "./modal.module.scss";

const Modal: React.FC<{ message: string }> = ({ message }) => {
  return (
    <dialog className={styles.main}>
      <p className={styles.main__desc} role="alert">
        {message}
      </p>
    </dialog>
  );
};

export default Modal;
