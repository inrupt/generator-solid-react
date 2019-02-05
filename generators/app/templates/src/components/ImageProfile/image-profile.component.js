import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ImageProfileWrapper,
  ButtonStyled,
  LoaderText,
  ImageProfileLoader
} from "./image-profile.style";

type Props = {
  image: String
};

export const ImageProfile = (props: Props) => {
  const photo =
    props.uploadedFiles && props.uploadedFiles.length > 0
      ? props.uploadedFiles[props.uploadedFiles.length - 1].uri
      : props.photo;
  return (
    <ImageProfileWrapper
      {...{
        onDragStart: props.overrideEventDefaults,
        onDragOver: props.overrideEventDefaults,
        onDragEnd: props.overrideEventDefaults,
        onDrag: props.overrideEventDefaults,
        onDragLeave: props.onDragLeave,
        onDragEnter: props.onDragEnter,
        onDrop: props.onDrop
      }}
    >
      {photo && <img alt="Profile User" src={photo} />}
      <ButtonStyled onClick={props.onClickFile}>
        <FontAwesomeIcon icon="upload" className="upload-icon" />
        Upload New Photo
      </ButtonStyled>
      {props.inProgress && (
        <ImageProfileLoader>
          <FontAwesomeIcon icon="spinner" spin size="2x" />
          <LoaderText>Uploading</LoaderText>
        </ImageProfileLoader>
      )}
    </ImageProfileWrapper>
  );
};
