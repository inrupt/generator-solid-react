import React from 'react';

import { Gradient } from './gradient-background.style';

type Props = {
  children: React.Node,
  className: String
};

const GradientBackground = ({ children, className }: Props) => (
  <Gradient className={className}>{children}</Gradient>
);

export default GradientBackground;
