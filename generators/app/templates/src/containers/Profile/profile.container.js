import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { withToastManager } from 'react-toast-notifications';
import {
    LiveUpdate,
    useWebId,
    ShexFormBuilder,
} from '@inrupt/solid-react-components';
import { Header, ProfileContainer, ProfileWrapper, DeleteNotification } from './profile.style';
import { Image, Form } from './components';
import './profile-shex-form.css';

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
    const { t, i18n } = useTranslation();

    const successCallback = () => {
        toastManager.add(['Success', t('profile.successCallback')], {
            appearance: 'success',
        });
    };

    const errorCallback = e => {
        toastManager.add(['Error', t('profile.errorCallback')], {
            appearance: 'error',
        });
    };

    return (
        <ProfileWrapper data-testid="profile-component">
            <ProfileContainer>
                {webId && (
                    <Fragment>
                        <Header>
                            <Image
                                {...{
                                    webId,
                                    defaultProfilePhoto,
                                    toastManager,
                                }}
                            />
                        </Header>
                      <DeleteNotification className="banner-wrap--warning banner">
                        <div className="banner-wrap__content">
                          <i className="icon fa fa-exclamation-circle"></i>
                          {t('profile.deleteNotification')}
                        </div>
                      </DeleteNotification>
                        <ShexFormBuilder
                            {...{
                                documentUri: webId,
                                shexUri:
                                    'https://shexshapes.inrupt.net/public/userprofile.shex',
                                theme: {
                                    form: 'shexForm',
                                    shexPanel: 'shexPanel',
                                    shexRoot: 'shexRoot',
                                    deleteButton:
                                        'deleteButton ids-button-stroke ids-button-stroke--secondary',
                                    inputContainer: 'inputContainer',
                                    addButtonStyle:
                                        'addButton ids-button-stroke ids-button-stroke--secondary',
                                },
                                languageTheme: {
                                    language: i18n.language.substring(0, 2),
                                },
                                successCallback,
                                errorCallback,
                            }}
                        />
                    </Fragment>
                )}
            </ProfileContainer>
        </ProfileWrapper>
    );
};

export default withToastManager(Profile);
