import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Uploader } from "@inrupt/solid-react-components";
import { Input } from "@util-components";
import { ImageProfile } from "@components";
import {
  ProfileWrapper,
  ProfileContainer,
  Header,
  ProfileContent,
  WebId
} from "./profile.style";

type Props = {
  webId: String,
  photo: String,
  formFields: Array<Object>,
  changeFormMode: () => void,
  formMode: boolean
};

export const ProfileComponent = ({
  webId,
  formFields,
  changeFormMode,
  formMode,
  photo
}: Props) => {
  return (
    <ProfileWrapper>
      <ProfileContainer>
        <Header>
          <button
            type="button"
            className="button edit-button"
            onClick={changeFormMode}
          >
            <FontAwesomeIcon icon="pencil-alt" /> EDIT
          </button>
          <Uploader
            {...{
              fileBase: webId && webId.split("/card")[0],
              limitFiles: 1,
              render: props => <ImageProfile {...{ ...props, webId, photo }} />
            }}
          />
        </Header>
        <ProfileContent>
          {formFields &&
            formFields.map(item => (
              <Input
                key={item.label}
                placeholder={item.label}
                type="text"
                value={item.value || ""}
                icon={item.icon}
                onChange={() => {}}
                readOnly={formMode}
              />
            ))}
        </ProfileContent>
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
