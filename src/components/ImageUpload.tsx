import { ChangeEvent, useState } from "react";

interface ImageUploadProps {
  handleUpload: (image: File) => void;
}

const ImageUpload = ({ handleUpload }: ImageUploadProps) => {
  const [image, setImage] = useState<File>();

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
    handleUpload(image);
  };

  // TODO: add images tags on upload a new image

  return (
    <form onSubmit={handleUploadClick}>
      <input type="file" onChange={handleFileChange} />

      <div>{image && `${image.name} - ${image.type}`}</div>

      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
