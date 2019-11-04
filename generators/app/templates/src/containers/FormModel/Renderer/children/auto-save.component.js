import React, { useState, useEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoSaveSpinnerWrapper } from './auto-save.style';

const AutoSaveSpinner = memo(({ inProgress, result, setResult, setSavingProcess }) => {
  const [timer, setTimer] = useState(null);
  useEffect(
    () => () => {
      clearTimeout(timer);
    },
    []
  );
  useEffect(() => {
    if (result) {
      if (timer) clearTimeout(timer);
      if (result.toLowerCase() === 'success') {
        setTimer(
          setTimeout(() => {
            setResult(null);
            setSavingProcess(false);
          }, 2000)
        );
      }
    }
  }, [result]);

  return (
    <AutoSaveSpinnerWrapper>
      {inProgress && (
        <div>
          <FontAwesomeIcon icon="spinner" spin />
        </div>
      )}
      {result && !inProgress && (
        <div>
          {result.toLowerCase() === 'success' && <FontAwesomeIcon icon="check-circle" />}
          {result.toLowerCase() === 'error' && <FontAwesomeIcon icon="exclamation-triangle" />}
        </div>
      )}
    </AutoSaveSpinnerWrapper>
  );
});

export default AutoSaveSpinner;
