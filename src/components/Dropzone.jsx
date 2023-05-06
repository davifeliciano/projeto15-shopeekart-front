import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160px;
  border: 2px dashed ${(props) => props.colors.primary};
  border-radius: 15px;
  padding: 20px;
  margin: 8px 0;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${(props) => props.colors.secondary};
  }

  & p {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.colors.primary};
  }

  & img {
    margin-top: 10px;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`;

const Dropzone = ({ onDrop, avatar }) => {
  const { colors } = useTheme();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*", // Only allow image files
  });

  return (
    <StyledDropzone {...getRootProps()} colors={colors}>
      <input {...getInputProps()} />
      {avatar ? (
        <img src={URL.createObjectURL(avatar)} alt="avatar" />
      ) : (
        <>
          <p>Drop your image here or click to select an image</p>
          <span>
            {isDragActive ? "Release to drop" : "Drag and drop an image here"}
          </span>
        </>
      )}
    </StyledDropzone>
  );
};

export default Dropzone;
