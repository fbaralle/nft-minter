import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { FileUploader } from "react-drag-drop-files";
import classNames from "classnames";
import toast from "react-hot-toast";
import { faImage, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FileDropzoneProps {
  name?: string;
  types?: string[];
  value?: File;
  onDrop?: (file: File) => void;
  handleChange: (file: File) => void;
  disabled?: boolean;
  classes?: {
    mainContainer?: string;
    previewContainer?: string;
    textContainer?: string;
  };
  style?: React.CSSProperties;
  maxFileSize?: number; //Max file size is in MiB
  handleFileSizeError?: void;
}

const PreviewImage = ({
  droppedFile,
  disabled,
  types,
}: {
  droppedFile?: File;
  disabled?: boolean;
  types?: any;
}) => {
  if (droppedFile && !droppedFile.type.includes("json")) {
    if (droppedFile.type.includes("video")) {
      return (
        <video
          crossOrigin="anonymous"
          className={styles.image}
          muted
          autoPlay
          loop
          playsInline
        >
          <source
            type="video/mp4"
            src={URL.createObjectURL(droppedFile)}
          ></source>
        </video>
      );
    }

    return (
      <img
        src={URL.createObjectURL(droppedFile)}
        className={styles.image}
        alt="Uploaded Image"
      />
    );
  }

  if (types.includes("JSON")) {
    return (
      // <ThemedIcon
      //   dual
      //   type="json"
      //   className={classNames(styles.image, disabled && styles.imageDisabled)}
      // />
      <FontAwesomeIcon
        icon={faPhotoFilm}
        size="sm"
        className={`text-gray-400`}
      />
    );
  }

  return (
    // <ThemedIcon
    //   type="picture"
    //   className={classNames(styles.image, disabled && styles.imageDisabled)}
    // />
    <FontAwesomeIcon icon={faImage} size="sm" className={`text-gray-400`} />
  );
};

const FileDropzone: React.FC<FileDropzoneProps> = ({
  name = "file",
  types = ["JPG", "JPEG", "PNG", "GIF", "WEBP", "MP4", "JSON"],
  onDrop,
  handleChange,
  disabled,
  value,
  classes = { mainContainer: "", textContainer: "", previewContainer: "" },
  style = {},
  maxFileSize,
}) => {
  const [droppedFile, setDroppedFile] = useState(null);

  useEffect(() => {
    if (!value) {
      setDroppedFile(null);
    }
  }, [value]);

  const handleDrop = (file: File) => {
    if (disabled) return;

    // @ts-ignore
    if (file.size / 1024 / 1024 > maxFileSize) {
      defaultHandleFileSizeError(
        `This file cannot be larger than ${maxFileSize} mb!`
      );
      return;
    }

    // @ts-ignore
    setDroppedFile(file);
    handleChange && handleChange(file);
  };

  const handleTypeError = (error: string) => {
    toast.error(error);
  };

  const defaultHandleFileSizeError = (error: string) => {
    toast.error(error);
  };

  return (
    <div
      className={classNames(disabled && styles.disabled, classes.mainContainer)}
      style={style}
    >
      <FileUploader
        name={name}
        fileOrFiles={droppedFile}
        types={types}
        onDrop={onDrop}
        handleChange={handleDrop}
        onTypeError={handleTypeError}
      >
        <div
          className={classNames(
            styles.dragAndDropUpload,
            classes.previewContainer
          )}
        >
          <PreviewImage
            disabled={disabled}
            // @ts-ignore
            droppedFile={droppedFile}
            types={types}
          />
          <div
            className={classNames(
              styles.dragAndDropUploadText,
              classes.textContainer
            )}
          >
            <span
              className={classNames(
                styles.uploadTitle,
                disabled && styles.disabledText
              )}
              style={{ fontWeight: "bold" }}
            >
              Drag and drop file here to upload
            </span>
            <span
              className={classNames(
                styles.acceptedFormats,
                disabled && styles.disabledText
              )}
            >
              Accepted formats: {types.join(",")}
            </span>
          </div>
        </div>
      </FileUploader>
    </div>
  );
};

export default FileDropzone;
