import React from "react";

import { PanelWrapper } from "./panel.style";

type Props = {
  children: React.Node,
  className: String
};

const Panel = ({ children, className }: Props) => (
  <PanelWrapper className={className}>{children}</PanelWrapper>
);

export default Panel;
