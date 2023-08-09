import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let user = null;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    user = res.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }

  return user;
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  let user = null;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    user = res.user;
    // set(ref(db, `users/${user.uid}`), {
    //   uid: user.uid,
    //   name: name,
    //   email: user.email,
    //   authProvider: "local",
    // });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
  return user;
};

export const logoutFirebase = () => {
  signOut(auth);
};
