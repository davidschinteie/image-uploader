import { useAuth0 } from "@auth0/auth0-react";
import Layout from "../../components/Layout";
import imageUpload from "../../assets/undraw_image_upload.svg";
import styles from "../../styles/signInPage.module.css";

const SignInPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Layout>
      <div className={styles.loginWrapper}>
        <h1 className={styles.loginTitle}>Image Uploader App</h1>
        <img src={imageUpload} alt="Start uploading your images" />
        <h3>Ready to start uploading your images?</h3>
        <button
          type="submit"
          className={styles.ctaLink}
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      </div>
    </Layout>
  );
};

export default SignInPage;
