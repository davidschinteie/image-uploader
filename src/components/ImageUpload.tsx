import { ChangeEvent, useRef, useState } from "react";
import styles from "../styles/imageUpload.module.css";
import { ProgressType } from "../types";
import Chips from "./Chips";
import { AiOutlineCloudUpload } from "react-icons/ai";
import AnimatedProgress from "./AnimatedProgress";

interface ImageUploadProps {
  handleUpload: (image: File, tags: string[]) => void;
  isUploading: boolean;
  progress?: ProgressType;
}

const ImageUpload = ({
  handleUpload,
  isUploading,
  progress,
}: ImageUploadProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [imageTags, setImageTags] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddTag = (tag: string) => {
    if (imageTags.find((tagEl) => tagEl === tag)) {
      return;
    }
    setImageTags((prevState) => [...prevState, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    setImageTags((prevState) => prevState.filter((tagEl) => tagEl !== tag));
  };

  const handleUploadClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      return;
    }
    handleUpload(image, imageTags);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    setImage(null);
    setImageTags([]);
  };

  return (
    <form onSubmit={handleUploadClick} className={styles.imageUploadForm}>
      <label className={styles.imageUploadLabel} htmlFor="file">
        Upload your image: <AiOutlineCloudUpload />
      </label>
      <input
        id="file"
        type="file"
        ref={imageInputRef}
        onChange={handleFileChange}
        className={styles.imageUploadInput}
      />
      {image && (
        <>
          <img className={styles.imagePreview} src={previewImage} alt="" />
          <p>{image.name}</p>
        </>
      )}
      <Chips
        chips={imageTags}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        placeholder="Add a tag..."
      />
      <button
        type="submit"
        className="ctaLink"
        disabled={!image || isUploading}
      >
        Upload
      </button>
      {/* TODO: fix update image upload progress info */}
      {progress?.isVisible && (
        <AnimatedProgress
          startNumber={progress.startValue}
          endNumber={progress.endValue}
          duration={0.7}
        />
      )}
    </form>
  );
};

export default ImageUpload;
