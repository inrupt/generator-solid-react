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
        <div>
          <FontAwesomeIcon icon="spinner" spin />
        </div>
      )}
      <div>{errored && <FontAwesomeIcon icon="exclamation-triangle" />}</div>
    </AutoSaveSpinnerWrapper>
  );
};
