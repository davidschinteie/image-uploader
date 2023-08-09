import { UserImageType } from "../types";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/imageGallery.module.css";

interface ImageGalleryProps {
  images: UserImageType[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className={styles.galleryWrapper}>
      <h1 className={styles.title}>ImageGallery</h1>

      {images && (
        <div className={styles.imagesContainer}>
          {images.map((userImage) => (
            <img key={uuidv4()} src={userImage.imageUrl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
