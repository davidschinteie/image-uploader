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
import Snackbar from "../components/SnackBar";
import { AuthContext } from "../context/AuthContext";
import { ProgressType, UserImageType } from "../types";
import { db, storage } from "../utils/firebase";

const INITIAL_PROGRESS_VALUE: ProgressType = {
  isVisible: true,
  startValue: 0,
  endValue: 75,
};

interface snackBarOptionsProps {
  isOpen: boolean;
  message: string;
  variant: "success" | "error";
}

const Home = () => {
  const { user } = useContext(AuthContext);
  const docRef = doc(db, "users", user!.userId);
  const [userImages, setUserImages] = useState<UserImageType[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [snackBarOptions, setSnackBarOptions] = useState<snackBarOptionsProps>({
    isOpen: false,
    message: "",
    variant: "error",
  });
  const [progressStats, setProgressStats] = useState<ProgressType>(
    INITIAL_PROGRESS_VALUE
  );

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

  const handleUpload = (image: File, tags: string[]) => {
    const imageName = `${new Date().getTime()}_${image.name}`;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    setIsUploadingImage(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressStats((prevState) => ({
          isVisible: true,
          startValue: prevState.endValue,
          endValue: Math.floor(progress),
        }));
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
          await updateDoc(docRef, {
            images: arrayUnion({ imageUrl: downloadURL, imageTags: tags }),
          });
          setUserImages((prevState) => [
            ...prevState,
            { imageUrl: downloadURL, imageTags: tags },
          ]);
          setProgressStats({
            isVisible: false,
            startValue: 0,
            endValue: 0,
          });
          setIsUploadingImage(false);
          setSnackBarOptions({
            isOpen: true,
            message: "Image uploaded successfully",
            variant: "success",
          });
        });
      }
    );
  };

  const handleRemoveImage = async (userImage: UserImageType) => {
    try {
      await updateDoc(docRef, {
        images: arrayRemove(userImage),
      });

      setUserImages((prevState) =>
        prevState.filter((image) => image.imageUrl !== userImage.imageUrl)
      );
      setSnackBarOptions({
        isOpen: true,
        message: "Image removed successfully",
        variant: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleUpdateTags = async (
    userImage: UserImageType,
    newTags: string[]
  ) => {
    const newUserImage = { ...userImage, imageTags: newTags };
    console.log("newTags", newTags);
    try {
      await updateDoc(docRef, {
        images: arrayRemove(userImage),
      });

      await updateDoc(docRef, {
        images: arrayUnion(newUserImage),
      });

      setUserImages((prevState) =>
        prevState.map((image) => {
          if (image.imageUrl === userImage.imageUrl) {
            return newUserImage;
          }
          return image;
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (snackBarOptions.isOpen) {
      const timer = setTimeout(() => {
        setSnackBarOptions((prevState) => ({ ...prevState, isOpen: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackBarOptions]);

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
        <ImageUpload
          handleUpload={handleUpload}
          isUploading={isUploadingImage}
          progress={progressStats}
        />
        <ImageGallery
          images={userImages}
          handleRemoveImage={handleRemoveImage}
          handleUpdateTags={handleUpdateTags}
        />
        <Snackbar
          open={snackBarOptions.isOpen}
          text={snackBarOptions.message}
          handleClose={() =>
            setSnackBarOptions((prevState) => ({
              ...prevState,
              isOpen: false,
            }))
          }
          variant={snackBarOptions.variant}
        />
      </main>
    </>
  );
};

export default Home;
