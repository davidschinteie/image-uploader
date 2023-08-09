import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { UserImageType } from "../types";
import ImageGallery from "../components/ImageGallery";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [userImages, setUserImages] = useState<UserImageType[]>([]);

  const fetchImages = async () => {
    if (!user) {
      return;
    }
    const docRef = doc(db, "users", user.userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      alert("Images could not be displayed!");
    }
  };

  useEffect(() => {
    fetchImages().then((res) => {
      setUserImages(res?.images);
    });
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <p>
          {user!.name && `Hello, ${user!.name}!`} Capture the moment by
          uploading your images and explore your personalized gallery.
        </p>
        <ImageUpload />
        <ImageGallery images={userImages} />
      </main>
    </>
  );
};

export default Home;
