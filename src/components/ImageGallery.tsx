import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/imageGallery.module.css";
import { UserImageType } from "../types";
import Chips from "./Chips";

interface ImageGalleryProps {
  images: UserImageType[];
  handleRemoveImage: (userImage: UserImageType) => void;
  handleUpdateTags: (userImage: UserImageType, newTags: string[]) => void;
}

const ImageGallery = ({
  images,
  handleRemoveImage,
  handleUpdateTags,
}: ImageGalleryProps) => {
  return (
    <div className={styles.galleryWrapper}>
      <h1 className={styles.title}>ImageGallery</h1>

      {images && (
        <div className={styles.imagesContainer}>
          {images.map((userImage) => (
            <div key={uuidv4()} className={styles.imageElement}>
              <div className={styles.image}>
                <img src={userImage.imageUrl} />
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleRemoveImage(userImage)}
                >
                  <AiFillDelete className={styles.inlineSvg} />
                </button>
              </div>
              <div className={styles.chipsElement}>
                <Chips
                  chips={userImage.imageTags}
                  handleAddTag={(tag) =>
                    handleUpdateTags(userImage, [...userImage.imageTags, tag])
                  }
                  handleDeleteTag={(tag) =>
                    handleUpdateTags(
                      userImage,
                      userImage.imageTags.filter((tagEl) => tagEl !== tag)
                    )
                  }
                  placeholder="Add a new tag..."
                  isEditable
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
