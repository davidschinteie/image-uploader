import { ChangeEvent, useContext, useState } from "react";
import { db, storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const ImageUpload = () => {
  const [image, setImage] = useState<File>();
  const { user } = useContext(AuthContext);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      return;
    }

    console.log("upload file", image);
    const imageName = `${new Date().getTime()}_${image.name}`;

    const storageRef = ref(storage, imageName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
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
        console.error(error);
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          if (!user) {
            return;
          }
          const docRef = doc(db, "users", user.userId);
          await updateDoc(docRef, {
            images: arrayUnion({ imageUrl: downloadURL, tags: [] }),
          });
        });
      }
    );
  };

  return (
    <form onSubmit={handleUploadClick}>
      <input type="file" onChange={handleFileChange} />

      <div>{image && `${image.name} - ${image.type}`}</div>

      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
