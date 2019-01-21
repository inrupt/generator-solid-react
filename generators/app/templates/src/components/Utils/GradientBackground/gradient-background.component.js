import React from "react";

//import './styles.scss';
import { Gradient } from "./gradient-background.style";

type Props = {
  children?: React.Node,
  className: String
};

const GradientBackground = ({ children, className }: Props) => {
  return <Gradient className={className}>{children}</Gradient>;
};

export default GradientBackground;
