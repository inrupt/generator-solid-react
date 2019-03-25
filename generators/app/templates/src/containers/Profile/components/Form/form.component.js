import React, { Fragment } from 'react';
import { Button, Form, FullGridSize, WebId } from "../../profile.style";
import { Input } from '@util-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const FormUi = ({ onSubmit, formFields, mode, onCancel, onInputChange, updatedFields, webId }) => {

  function getProfileValue(updatedFields: Object, item: Object) {
    const currentKey = item.nodeBlank || item.property;
    if (updatedFields[currentKey]) {
      if (
        updatedFields[currentKey].value ||
        updatedFields[currentKey].value === ''
      )
        return updatedFields[currentKey].value;
    }
    return item.value || '';
  }

  return(
    <Fragment>
      <Form onSubmit={onSubmit}>
        {formFields &&
        formFields.map(item => (
          <Input
            key={item.label}
            placeholder={item.label}
            name={item.nodeBlank || item.property}
            value={getProfileValue(updatedFields, item)}
            onChange={onInputChange}
            icon={item.icon}
            readOnly={mode}
            required={item.required}
            data-nodeparenturi={item.nodeParentUri}
            data-nodeblank={item.nodeBlank}
            data-label={item.label}
            data-icon={item.icon}
            type={'text'}
          />
        ))}
        <FullGridSize>
          {!mode && (
            <>
              <Button
                type='button'
                onClick={onCancel}
                className='ids-link-stroke ids-link-stroke--primary'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='ids-link-filled ids-link-filled--primary'
              >
                Save
              </Button>
            </>
          )}
        </FullGridSize>
      </Form>
      {mode && (
        <WebId>
          <FontAwesomeIcon icon='id-card' />
          <a href={webId} target='_blank' rel='noopener noreferrer'>
            {webId}
          </a>
        </WebId>
      )}
    </Fragment>
  );
}
