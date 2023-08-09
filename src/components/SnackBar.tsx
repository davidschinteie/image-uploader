import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import styles from "../styles/snackBar.module.css";

interface SnackbarProps {
  text: React.ReactNode;
  handleClose: () => void;
  open: boolean;
  variant?: "success" | "error" | "info";
}

const Snackbar = ({
  open,
  text,
  handleClose,
  variant = "error",
}: SnackbarProps) => {
  const variantIcon = {
    success: <BsCheck2Circle />,
    error: <BiErrorCircle />,
    info: <FiInfo />,
  };

  const Icon = variantIcon[variant];

  //   console.log("snackbar", open);

  if (!open) {
    return null;
  }

  return (
    <div className={styles[variant]}>
      <span className={styles.iconWrapper} aria-hidden="true">
        {Icon}
      </span>
      <span className={styles.innerText}>{text}</span>
      <button type="button" onClick={handleClose}>
        <IoCloseSharp className={styles.closeIcon} />
      </button>
    </div>
  );
};

export default Snackbar;
