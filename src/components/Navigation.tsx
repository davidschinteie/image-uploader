import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/navigation.module.css";
import { AiOutlineLogin } from "react-icons/ai";

const Navigation = () => {
  const { logout } = useAuth0();
  return (
    <nav className={styles.nav}>
      <button
        className={styles.logout}
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
        <AiOutlineLogin />
      </button>
    </nav>
  );
};

export default Navigation;
