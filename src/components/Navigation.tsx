import styles from "../styles/navigation.module.css";
import { AiOutlineLogin } from "react-icons/ai";
import { logoutFirebase } from "../utils/firebase";
import { useAuth } from "../hooks/useAuth";

const Navigation = () => {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logoutFirebase();
    logout();
  };

  return (
    <nav className={styles.nav}>
      <button className={styles.logout} onClick={handleLogOut}>
        Log Out
        <AiOutlineLogin />
      </button>
    </nav>
  );
};

export default Navigation;
