import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/authForm.module.css";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../utils/firebase";

interface AuthFormProps {
  mode: "signin" | "register";
  title: string;
  buttonText: string;
  linkUrl: string;
  linkText: string;
}

const initialFormState = {
  email: "",
  password: "",
  name: "",
};

const AuthForm = ({
  mode,
  title,
  buttonText,
  linkUrl,
  linkText,
}: AuthFormProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (mode === "signin") {
        const user = await logInWithEmailAndPassword(
          formState.email,
          formState.password
        );
        if (user !== null) {
          login({
            userId: user.uid ?? "",
            name: user.displayName ?? "",
            email: user.email ?? "",
          });
          navigate("/");
        }
      } else {
        await registerWithEmailAndPassword(
          formState.name,
          formState.email,
          formState.password
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1 className={styles.authTitle}>{title}</h1>
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }))
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={(event) =>
          setFormState((prevState) => ({
            ...prevState,
            password: event.target.value,
          }))
        }
      />
      {mode === "register" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(event) =>
              setFormState((prevState) => ({
                ...prevState,
                name: event.target.value,
              }))
            }
          />
        </>
      )}
      <button type="submit" className={styles.ctaLink} onClick={() => {}}>
        {buttonText}
      </button>
      <Link to={linkUrl} className={styles.iconLink}>
        <FaUserPlus className={styles.inlineSvg} />
        {linkText}
      </Link>
    </form>
  );
};

export default AuthForm;
