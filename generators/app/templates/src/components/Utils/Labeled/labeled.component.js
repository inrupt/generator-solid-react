import React, { useState } from 'react';
import styled from 'styled-components';

const Labeled = ({ label, children, component: Component = 'button', ...rest }) => {
  const [hover, setHover] = useState(false);

  const LComponent = styled(Component)`
    position: relative;
    & > span.label {
      position: absolute;
      font-size: 10px;
      bottom: 2px;
      left: 0;
      width: 100%;
      text-align: center;
    }
  `;

  return (
    <LComponent {...rest} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {children}
      <span className="label">{hover && label ? label : ''}</span>
    </LComponent>
  );
};

export default Labeled;
