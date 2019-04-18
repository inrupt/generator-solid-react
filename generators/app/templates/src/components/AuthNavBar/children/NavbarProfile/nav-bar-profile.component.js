import React, { Component } from 'react';
import styled from 'styled-components';
import { Dropdown } from '@util-components';

import auth from 'solid-auth-client';

export const ImageContainer = styled.div`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-size: cover;
    overflow: hidden;
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    display: ${({ show }) => (show ? 'block' : 'none')};
`;

export const Img = styled.img`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

export const LoadingImage = styled(ImageContainer)`
    background: #cccccc;
    display: block;
`;

export const UserName = styled.span`
  display: inline-block;
  margin-left: 10px;
`;

class NavBarProfile extends Component {
    state = {
        imageLoaded: false,
    };

    profileRedirect = () => this.props.history.push('/profile');

    onImageLoaded = async () => this.setState({ imageLoaded: true });
    logOut = async () => {
        try {
            await auth.logout();
            // Remove localStorage
            localStorage.removeItem('solid-auth-client');
            // Redirect to login page
            this.props.history.push('/login');
        } catch (error) {
            // console.log(`Error: ${error}`);
        }
    };
    render() {
        const { t, img, open, customClass } = this.props;
        const { imageLoaded } = this.state;

        const profileOpts = [
            {
                label: t('navBar.profile'),
                onClick: this.profileRedirect,
                icon: 'cog'
            },
            {
                label: t('navBar.logOut'),
                onClick: this.logOut,
                icon: 'lock'
            },
        ];

        return img ? (
            <Dropdown
                actions={profileOpts}
                className={`nav-bar--profile ${customClass}`}
                hover={true}
                open={open}
            >
                <ImageContainer show={imageLoaded}>
                    <Img
                        show={imageLoaded}
                        src={img}
                        alt="profile"
                        onLoad={this.onImageLoaded}
                    />
                </ImageContainer>
                {!imageLoaded && <LoadingImage show={true} />}
            </Dropdown>
        ) : (
            <div />
        );
    }
}

export default NavBarProfile;
