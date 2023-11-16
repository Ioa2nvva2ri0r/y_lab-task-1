import React from "react";
// Styles
import styles from "./exemple.module.scss";

const Exemple: React.FC = () => {
  return (
    <p className={styles.main}>
      {Object.entries({ email: "example@yandex.by", password: "123456" }).map(
        ([key, value]) => (
          <strong>
            <span>{key}: </span>
            <span>{value}</span>
          </strong>
        )
      )}
    </p>
  );
};

export default Exemple;
