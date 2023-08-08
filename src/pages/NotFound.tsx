import { Link } from "react-router-dom";
import notFoundImage from "../assets/undraw_not_found.svg";
import styles from "../styles/notFoundPage.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h1 className={styles.title}>404 - Page not Found</h1>
      <img src={notFoundImage} alt="Page not found image" />
      <Link to={"/"}>Go Back to homepage</Link>
    </div>
  );
};

export default NotFound;
