import React, { useRef, useState } from "react";
// Crypto-js
import { AES, enc } from "crypto-js";
// Utils
import { checkJson, convertInString, env } from "utils";
import dataForm from "utils/dataform";
// Components
import Input from "./Input";
import Modal from "./Modal";
// Styles
import styles from "./authForm.module.scss";
// Types
interface IFormData {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  // React Ref
  const formRef = useRef<HTMLFormElement>(null);
  // React State
  const [auth, setAuth] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const onSubmitForm = async () => {
    const form = formRef.current;
    if (form) {
      const data = dataForm<IFormData>(form);

      if (data) {
        setLoad(true);

        try {
          const response = await fetch(env("api"));

          if (response.ok) {
            const dataApi = (await response.json()) as string[];

            const checkUser = dataApi.filter((s) => {
              const bytes = AES.decrypt(s, env("key"));
              const decrypted = bytes.toString(enc.Utf8);
              const user = checkJson(decrypted) as IFormData;

              return (
                user.email === data.email && user.password === data.password
              );
            })[0];

            if (Boolean(checkUser)) {
              setAuth(true);
              setTimeout(() => setAuth(false), 3000);
            } else throw new Error("Неверный логин или пароль!");
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
            setTimeout(() => setError(null), 3000);
          }
        } finally {
          setLoad(false);
        }
      }
    }
  };

  return (
    <form ref={formRef} className={styles.main}>
      <h1 className={styles.title}>Авторизация</h1>
      <ul className={styles.list}>
        {["email", "password"].map((s) => (
          <li key={s} className={styles.item}>
            <Input
              placeholder={s === "password" ? "Пароль" : "Электронная почта"}
              type={s}
              name={s}
              classNameLabel={styles.label}
              className={convertInString(styles.input)}
              autoComplete={s === "password" ? `current-${s}` : s}
              disabled={load}
              required
            />
          </li>
        ))}
      </ul>
      <button
        className={styles.btn}
        type="button"
        disabled={load}
        onClick={onSubmitForm}
      >
        Войти
        <span data-loader={load} />
      </button>
      {(auth || error) && (
        <Modal message={error ? error : "Пользователь успешно авторизован!"} />
      )}
    </form>
  );
};

export default AuthForm;
