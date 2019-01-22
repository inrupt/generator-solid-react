import React from "react";
import { CenterContainerWrapper } from "./center-container.style";
type Props = {
  children: React.Node,
  className: String
};

const CenterContainer = ({ children, className }: Props) => {
  return (
    <CenterContainerWrapper className={className}>
      <div className="wrapper">{children}</div>
    </CenterContainerWrapper>
  );
};

export default CenterContainer;
