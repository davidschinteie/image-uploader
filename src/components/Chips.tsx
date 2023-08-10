import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/chips.module.css";

interface ChipsProps {
  chips: string[];
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tag: string) => void;
  placeholder: string;
  isEditable?: boolean;
}

const Chips = ({
  chips,
  handleAddTag,
  handleDeleteTag,
  placeholder,
  isEditable = false,
}: ChipsProps) => {
  const [tagName, setTagName] = useState("");
  const [editTags, setEditTags] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag(tagName);
      setTagName("");
    }
  };

  return (
    <div
      className={`${styles.chipsWrapper} ${
        isEditable ? styles.isEditable : ""
      }`}
    >
      <div className={styles.chipsElements}>
        {chips.map((chip) => (
          <span className={styles.chip} key={uuidv4()}>
            <span className={styles.chipValue}>{chip}</span>
            {(editTags || !isEditable) && (
              <button
                className={styles.chipBtn}
                onClick={() => handleDeleteTag(chip)}
              >
                <AiOutlineClose />
              </button>
            )}
          </span>
        ))}
        {isEditable && chips.length === 0 && <p>No image tags</p>}
        {(editTags || !isEditable) && (
          <input
            type="text"
            placeholder={placeholder}
            value={tagName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
      {isEditable && (
        <button
          className={styles.editBtn}
          onClick={() => setEditTags(!editTags)}
        >
          <BiSolidEditAlt />
        </button>
      )}
    </div>
  );
};

export default Chips;
