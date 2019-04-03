import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from "react-i18next";

import { withToastManager } from 'react-toast-notifications';
import { LiveUpdate, useWebId } from '@inrupt/solid-react-components';
import { Header, ProfileContainer, ProfileWrapper } from './profile.style';
import { Image, Form } from './components';

const defaultProfilePhoto = '/img/icon/empty-profile.svg';

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */

const Profile = ({ toastManager }) => {
    const webId = useWebId();
    const [mode, setMode] = useState(true);

    const onCancel = () => {
        setMode(!mode);
    };

    const exitEditMode = () => {
      setMode(true);
    };
    const { t } = useTranslation();
    return (
        <ProfileWrapper data-testid="profile-component">
            <ProfileContainer>
                {webId && (
                    <LiveUpdate subscribe={webId.replace(/#.*/, '')}>
                        <Header>
                            {mode && (
                                <button
                                    type="button"
                                    className="button edit-button"
                                    onClick={onCancel}
                                    data-testid="edit-profile-button"
                                >
                                    <FontAwesomeIcon icon="pencil-alt" /> {t('profile.edit')}
                                </button>
                            )}
                            <Image
                                {...{
                                    webId,
                                    defaultProfilePhoto,
                                    toastManager,
                                }}
                            />
                        </Header>
                        <Form {...{ mode, toastManager, webId, onCancel, exitEditMode }} />
                    </LiveUpdate>
                )}
            </ProfileContainer>
        </ProfileWrapper>
    );
};

export default withToastManager(Profile);
