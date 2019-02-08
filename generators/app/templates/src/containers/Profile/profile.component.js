import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isLoading from "@hocs/isLoading";
import { Uploader } from "@inrupt/solid-react-components";
import { Input } from "@util-components";
import { ImageProfile } from "@components";
import {
  ProfileWrapper,
  ProfileContainer,
  FullGridSize,
  Button,
  Header,
  Form,
  WebId
} from "./profile.style";

type Props = {
  webId: String,
  photo: String,
  formFields: Array<Object>,
  changeFormMode: () => void,
  onInputChange: () => void,
  onSubmit: () => void,
  onCancel: () => void,
  updatePhoto: (uri: String) => void,
  toastManager: (message: String, options: Object) => void,
  formMode: boolean
};

const ProfileComponent = ({
  webId,
  formFields,
  changeFormMode,
  onInputChange,
  updatePhoto,
  toastManager,
  onSubmit,
  onCancel,
  formMode,
  photo
}: Props) => {
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <Header>
          {formMode && (
            <button
              type="button"
              className="button edit-button"
              onClick={changeFormMode}
            >
              <FontAwesomeIcon icon="pencil-alt" /> EDIT
            </button>
          )}
          <Uploader
            {...{
              fileBase: webId && webId.split("/card")[0],
              limitFiles: 1,
              limitSize: 500000,
              accept: "image/*",
              onError: error => {
                if (error && error.message) {
                  toastManager.add(error.message, { appearance: "error" });
                }
              },
              onComplete: uploadedFiles => {
                updatePhoto(uploadedFiles[0].uri);
              },
              render: props => <ImageProfile {...{ ...props, webId, photo }} />
            }}
          />
        </Header>
        <Form onSubmit={onSubmit}>
          {formFields &&
            formFields.map(item => (
              <Input
                key={item.label}
                placeholder={item.label}
                type="text"
                name={item.blankNode || item.property}
                value={item.value || ""}
                onChange={onInputChange}
                icon={item.icon}
                readOnly={formMode}
                required
              />
            ))}
          <FullGridSize>
            {!formMode && (
              <>
                <Button
                  type="button"
                  onClick={onCancel}
                  className="ids-link-stroke ids-link-stroke--primary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="ids-link-filled ids-link-filled--primary"
                >
                  Save
                </Button>
              </>
            )}
          </FullGridSize>
        </Form>
        {formMode && (
          <WebId>
            <FontAwesomeIcon icon="id-card" />
            <a href={webId} target="_blank" rel="noopener noreferrer">
              {webId}
            </a>
          </WebId>
        )}
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default isLoading(ProfileComponent);
