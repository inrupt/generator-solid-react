import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoSaveSpinnerWrapper } from './auto-save.style';

type Props = {
  errored: boolean,
  running: boolean
};

export const AutoSaveSpinner = (props: Props) => {
  const { errored, running } = props;

  return (
    <AutoSaveSpinnerWrapper>
      {running && (
        <span>
          <FontAwesomeIcon icon="spinner" spin />
        </span>
      )}
      <span>{errored && <FontAwesomeIcon icon="exclamation-triangle" />}</span>
    </AutoSaveSpinnerWrapper>
  );
};
