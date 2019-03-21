import React, { useState, useEffect } from 'react';
import data from "@solid/query-ldflex";
import { Uploader, useLiveUpdate } from '@inrupt/solid-react-components';
import { ImageProfile } from '@components';

type Props = {
  webId: String,
  toastManager: String
};


export const Image = ({ webId, toastManager, defaultProfilePhoto }: Props) => {
  const [image, setImage] = useState('');

  const latestUpdate = useLiveUpdate();

  useEffect( () => {
    fetchPhoto();
  }, [webId, latestUpdate]);
  /**
   * Fetch profile photo from card
   */
  const fetchPhoto = async () => {
    try {
      if (webId) {
        // We are fetching profile card document
        const user = data.user;
        /**
         * We access to document node using a node name
         * hasPhoto is a new context that ldflex doesn't having
         * we need to add it manually.
         * if you want to know more about context please go to:
         * https://github.com/digitalbazaar/jsonld.js
         */
        const image = await user.image || await user.vcard_hasPhoto;

        setImage(image && image.value);
      }
    } catch (error) {
      toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };
  /**
   * updatedPhoto will update the photo url on vcard file
   * this function will check if user has image or hasPhoto node if not
   * will just update it, the idea is use image instead of hasPhoto
   * @params{String} uri photo url
   */
  const updatePhoto = async (uri: String) => {
    try {
      const {user} = data;

      await user.image.set (uri)

      toastManager.add (['', 'Profile Image was updated'], {
        appearance: 'success',
      });
    } catch (error) {
      toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };

  return (
    <Uploader
      {...{
        fileBase: webId && webId.split('/card')[0],
        limitFiles: 1,
        limitSize: 2100000,
        accept: 'png, jpeg, jpg',
        onError: error => {
          if (error && error.statusText) {
            toastManager.add(['', error.statusText], {
              appearance: 'error'
            });
          }
        },
        onComplete: uploadedFiles => {
          updatePhoto(uploadedFiles[0].uri)
        },
        render: props => <ImageProfile {...{ ...props, webId, photo: image || defaultProfilePhoto }} />
      }}
    />
  );

}
