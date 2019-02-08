import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {PageWrapper} from '@util-components';
import isLoading from '@hocs/isLoading';
import {PreferencesContainer, Header, Body, Form} from './preferences.style';

import "flag-icon-css/css/flag-icon.min.css"


const Preferences = (props) => {
    return ( 
    <PageWrapper>
        <PreferencesContainer>
            <Header>
                <h1>Preferences</h1> 
                <button
                    type="button"
                    className="button edit-button"
                >
                <FontAwesomeIcon icon="pencil-alt" /> EDIT
                </button>
            </Header>
            <Body>
            <Form>
                <div>
                    <label>Language</label>
                    <div>
                        <span class="flag-icon flag-icon-us"></span>
                        {"  "}
                        <span>English (US)</span>
                    </div>
                </div>
            </Form>
            </Body>

        </PreferencesContainer>
    </PageWrapper> );
}
 
export default isLoading(Preferences);