import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import ImageUpload from "../components/ImageUpload";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";
import { UserImageType } from "../types";
import { db, storage } from "../utils/firebase";

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

  const handleUpload = (image: File) => {
    const imageName = `${new Date().getTime()}_${image.name}`;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: any) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = doc(db, "users", user!.userId);
          await updateDoc(docRef, {
            images: arrayUnion({ imageUrl: downloadURL, imageTags: [] }),
          });
          setUserImages((prevState) => [
            ...prevState,
            { imageUrl: downloadURL, imageTags: [] },
          ]);
        });
      }
    );
  };

  const handleRemoveImage = async (userImage: UserImageType) => {
    const docRef = doc(db, "users", user!.userId);
    try {
      await updateDoc(docRef, {
        images: arrayRemove(userImage),
      });

      setUserImages((prevState) =>
        prevState.filter((image) => image.imageUrl !== userImage.imageUrl)
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <p>
          {user!.name && `Hello, ${user!.name}!`} Capture the moment by
          uploading your images and explore your personalized gallery.
        </p>
        <ImageUpload handleUpload={handleUpload} />
        <ImageGallery
          images={userImages}
          handleRemoveImage={handleRemoveImage}
        />
      </main>
    </>
  );
};

export default Home;
