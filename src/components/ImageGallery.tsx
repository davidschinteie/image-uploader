import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/imageGallery.module.css";
import { UserImageType } from "../types";

interface ImageGalleryProps {
  images: UserImageType[];
  handleRemoveImage: (userImage: UserImageType) => void;
}

const ImageGallery = ({ images, handleRemoveImage }: ImageGalleryProps) => {
  // TODO: update existing images tags

  return (
    <div className={styles.galleryWrapper}>
      <h1 className={styles.title}>ImageGallery</h1>

      {images && (
        <div className={styles.imagesContainer}>
          {images.map((userImage) => (
            <div key={uuidv4()} className={styles.imageElement}>
              <img src={userImage.imageUrl} />
              <button
                className={styles.deleteBtn}
                onClick={() => handleRemoveImage(userImage)}
              >
                <AiFillDelete className={styles.inlineSvg} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
