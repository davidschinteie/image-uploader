import { ChangeEvent, useState } from "react";
import Chips from "./Chips";

interface ImageUploadProps {
  handleUpload: (image: File, tags: string[]) => void;
  isUploading: boolean;
}

const ImageUpload = ({ handleUpload, isUploading }: ImageUploadProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageTags, setImageTags] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
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
    setImage(null);
    setImageTags([]);
  };

  return (
    <form onSubmit={handleUploadClick}>
      <input type="file" onChange={handleFileChange} />

      <div>{image && `${image.name} - ${image.type}`}</div>

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
    </form>
  );
};

export default ImageUpload;
